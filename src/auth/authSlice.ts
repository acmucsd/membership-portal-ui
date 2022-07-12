import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Config from '../config';
import history from '../history';
import type { RootState } from '../redux/store';
import Storage from '../storage';
import { UserAccessType, UserState } from '../types';
import { fetchService, getDefaultProfile, getErrorMessage, notify } from '../utils';
import * as utils from './utils';

const register = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmpassword: '',
  major: undefined, // to trigger the select placeholder
  graduationYear: new Date().getFullYear(),
};

const defaultProfile = getDefaultProfile();
const initialState = {
  isAdmin: false,
  authenticated: false,
  error: false,
  emailSuccess: false,
  registerSuccess: false,
  register,
  profile: {
    uuid: '',
    firstName: '',
    lastName: '',
    email: '',
    credits: 0,
    accessType: UserAccessType.STANDARD,
    profilePicture: defaultProfile,
    graduationYear: 0,
    major: '',
    bio: '',
    points: 0,
    accountType: '',
    state: UserState.ACTIVE,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authError(state, { payload }: PayloadAction<{ error: boolean }>) {
      state.error = payload.error;
    },
    authUser(state, { payload }: PayloadAction<{ isAdmin: boolean }>) {
      state.isAdmin = payload.isAdmin;
      state.authenticated = true;
    },
    unauthUser(state) {
      state.isAdmin = false;
      state.authenticated = false;
    },
    setUser(state, { payload }: PayloadAction<typeof initialState.profile>) {
      if (payload.profilePicture == null) payload.profilePicture = defaultProfile;

      state.profile = payload;
    },
    passwordFail(state) {
      state.error = true;
    },
    passwordSuccess(state) {
      state.error = false;
      state.emailSuccess = true;
    },
    registerUser(state, { payload }: PayloadAction<typeof initialState.register>) {
      state.error = false;
      state.registerSuccess = true;
      state.register = payload;
    },
    registerFail(state) {
      state.error = true;
    },
  },
});

export const { authError, authUser, setUser, passwordFail, passwordSuccess, registerUser, registerFail, unauthUser } = authSlice.actions;

export const loginUser = createAsyncThunk<void, { values: { email: string; password: string }; search: string }>(
  'auth/loginUser',
  async ({ values, search }, { dispatch }) => {
    try {
      const { email, password } = values;
      const token = await utils.loginUser(email, password);
      const { isAdmin } = utils.tokenGetClaims(token);
      Storage.set('token', token);
      dispatch(authUser({ isAdmin }));

      const params = new URLSearchParams(search);
      const code = params.get('code');
      const destination = params.get('destination');
      if (code) {
        // If the user was signed out when trying to check in, direct them to the checkin page
        history.replace(`/checkin?code=${code}}`);
      } else if (destination) {
        // If the user was signed out when trying to access the site, return them to their desired destination
        history.replace(decodeURIComponent(destination));
      } else {
        // Otherwise, redirect to home
        history.replace('/');
      }
    } catch (error) {
      notify('Unable to login!', getErrorMessage(error));
      dispatch(authError({ error: Boolean(error) }));
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', (_, { dispatch }) => {
  dispatch(unauthUser);
  Storage.remove('token');
  history.replace('/login');
});

export const verifyToken = createAsyncThunk<{ isAdmin: boolean }, { search: string; pathname: string }>(
  'auth/verifyToken',
  async ({ search, pathname }, { dispatch }) =>
    new Promise(async (resolve, reject) => {
      const token = Storage.get('token');
      if (token) {
        try {
          const url = `${Config.API_URL}${Config.routes.auth.verification}`;
          const data = await fetchService(url, 'POST', 'json', {
            requiresAuthorization: true,
          });

          if (!data.authenticated) {
            // not authenticated? log out user
            dispatch(unauthUser());
            notify('Login expired', 'Please sign in again');

            // redirect to /login
            history.replace(`/login${search}`);
            resolve(data);
            return;
          }

          const userData = utils.tokenGetClaims(token);
          data.admin = userData.admin;
          dispatch(authUser({ isAdmin: userData.admin }));
          resolve(data);
        } catch (error) {
          notify('Unable to verify token!', getErrorMessage(error) || 'Try logging in again');
          dispatch(authError({ error: Boolean(error) }));

          // log out user due to probably faulty token
          dispatch(unauthUser());

          // redirerct to /login
          history.replace(`/login${search}`);
          reject(error);
        }
      } else {
        // log out user due to no token
        dispatch(unauthUser());

        if (pathname.toString() !== '/') {
          notify('Not Authenticated', 'Please sign in or register for an account before continuing.');
        }

        // redirerct to /login, while including the checkin code and desired destination if present
        const path = pathname.toString();
        const uri = encodeURIComponent(path);
        const dest = `${search.toString() ? '&' : '?'}destination=${uri}`;
        history.replace(`/login${search}${path !== '/' ? dest : ''}`);
        resolve({ isAdmin: false });
      }
    }),
);

export const passwordReset = createAsyncThunk('auth/passwordReset', async (email: string, { dispatch }) => {
  try {
    if (!email) {
      throw new Error('Email field cannot be empty.');
    }

    const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${email}`;
    await fetchService(url, 'GET', 'json', {
      requiresAuthorization: false,
    });

    notify('Success! Check your email shortly', `Email has been sent to ${email}`);
    dispatch(passwordSuccess());
  } catch (error) {
    notify('Error with email!', getErrorMessage(error));
    dispatch(passwordFail());
  }
});

export const registerAccount = createAsyncThunk<void, { search: any; user: any }>('auth/registerAccount', async ({ user, search }, { dispatch }) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.register}`;
    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({ user }),
    });

    dispatch(registerUser(user));

    // TODO: Redirect to auth, then log user in on register.
    // For now just login.
    dispatch(
      loginUser({
        values: {
          email: user.email,
          password: user.password,
        },
        search,
      }),
    );
  } catch (error) {
    notify('Unable to register account!', getErrorMessage(error));
    dispatch(registerFail());
  }
});

export const fetchUser = createAsyncThunk<void, { uuid: string } | undefined>('auth/fetchUser', async ({ uuid } = { uuid: '' }, { dispatch }) => {
  try {
    const url = `${Config.API_URL}${Config.routes.user.user}/${uuid}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

    dispatch(setUser(data.user));
  } catch (error) {
    // TODO: Dispatch error message.
  }
});

/**
 * Converts an async function into a thunk that logs out the user when an error
 * occurs
 */
type AsyncFunction = (...args: any) => Promise<any>;
export const withLogout = <T extends AsyncFunction>(fn: T, type: string) =>
  createAsyncThunk<Awaited<ReturnType<T>>, Parameters<T>[0]>(type, async (args, { dispatch }) => {
    try {
      return await fn(args);
    } catch (err) {
      dispatch(logoutUser());
      throw err;
    }
  });

export const fetchUserByID = withLogout(utils.fetchUserByID, 'auth/fetchUserByID');
export const authSelector = (state: RootState) => state.auth;
export const authProfileSelector = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
