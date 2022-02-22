import { AUTH_ERROR, AUTH_USER, FETCH_USER, PASSWORD_FAIL, PASSWORD_SUCCESS, REGISTER_FAIL, REGISTER_USER, UNAUTH_USER } from './authTypes';

import Config from '../config';
import history from '../history';
import Storage from '../storage';
import { notify, fetchService } from '../utils';

/**
 * Helper function to get token claims.
 * Credits to ACM @ UCLA for this function.
 *
 * @param {string} token - A jwt token returned from auth.
 * @return {object} The claims from the token.
 */
const tokenGetClaims = (token?: string): object => {
  if (!token) {
    return {};
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {};
  }
  return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
};

export const loginUser = (values, search) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.login}`;
    const data = await fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    Storage.set('token', data.token);
    const userData: { [key: string]: any } = tokenGetClaims(data.token);
    dispatch({
      type: AUTH_USER,
      isAdmin: userData.admin,
    });

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
    notify('Unable to login!', error.message);
    dispatch({
      type: AUTH_ERROR,
      error,
    });
  }
};

export const verifyToken = (dispatch) => async (search, pathname) => {
  return new Promise(async (resolve, reject) => {
    const token = Storage.get('token');
    if (token) {
      try {
        const url = `${Config.API_URL}${Config.routes.auth.verification}`;
        const data = await fetchService(url, 'POST', 'json', {
          requiresAuthorization: true,
        });

        if (!data.authenticated) {
          // not authenticated? log out user
          dispatch({
            type: UNAUTH_USER,
          });
          notify('Login expired', 'Please sign in again');
          // redirect to /login
          history.replace(`/login${search}`);
          resolve(data);
          return;
        }
        const userData: { [key: string]: any } = tokenGetClaims(token);
        dispatch({
          type: AUTH_USER,
          isAdmin: userData.admin,
        });
        data.admin = userData.admin;
        resolve(data);
      } catch (error) {
        notify('Unable to verify token!', error.message || 'Try logging in again');

        dispatch({
          type: AUTH_ERROR,
          error,
        });

        // log out user due to probably faulty token
        dispatch({
          type: UNAUTH_USER,
        });
        // redirerct to /login
        history.replace(`/login${search}`);
        reject(error);
      }
    } else {
      // log out user due to no token
      dispatch({
        type: UNAUTH_USER,
      });

      if (pathname.toString() !== '/') {
        notify('Not Authenticated', 'Please sign in or register for an account before continuing.');
      }

      // redirerct to /login, while including the checkin code and desired destination if present
      history.replace(
        `/login${search}${
          pathname.toString() !== '/'
            ? `${
                search.toString()
                  ? `&destination=${encodeURIComponent(pathname.toString())}`
                  : `?destination=${encodeURIComponent(pathname.toString())}`
              }`
            : ''
        }`,
      );
      resolve();
    }
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: UNAUTH_USER,
  });
  Storage.remove('token');
  history.replace('/login');
};

export const passwordReset = (email: string) => async (dispatch) => {
  try {
    if (!email) {
      throw new Error('Email field cannot be empty.');
    }

    const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${email}`;
    await fetchService(url, 'GET', 'json', {
      requiresAuthorization: false,
    });

    notify('Success! Check your email shortly', `Email has been sent to ${email}`);
    dispatch({
      type: PASSWORD_SUCCESS,
    });
  } catch (error) {
    notify('Error with email!', error.message);
    dispatch({
      type: PASSWORD_FAIL,
      payload: error.message,
    });
  }
};

export const updatePassword = (user) => async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${user.code}`;
    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({ user }),
    });

    history.replace('/');
  } catch (error) {
    notify('Unable to reset password!', error.message);
  }
};

// Verifies an email using a info object with email field and code field
export const verifyEmail = async (info: { [key: string]: any }) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${info.code}`;
    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({ ...info }),
    });

    notify('Verified email!', '');
  } catch (error) {
    notify('Unable to verify email!', error.message);
  }
};

export const sendEmailVerification = async (email: string) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${email}`;
    await fetchService(url, 'GET', 'json', {
      requiresAuthorization: false,
    });

    notify('Sent verification email!', '');
  } catch (error) {
    notify('Unable to send verification email!', error.message);
  }
};

export const registerAccount = (user, search) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.register}`;
    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({ user }),
    });

    dispatch({
      type: REGISTER_USER,
      payload: user,
    });
    // TODO: Redirect to auth, then log user in on register.
    // For now just login.
    dispatch(
      loginUser(
        {
          email: user.email,
          password: user.password,
        },
        search,
      ),
    );
  } catch (error) {
    notify('Unable to register account!', error.message);
    dispatch({
      type: REGISTER_FAIL,
      error,
    });
  }
};

export const redirectAuth = () => () => {
  history.replace('/authenticate-email');
};

export const fetchUser = (uuid?) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.user.user}/${uuid || ''}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

    dispatch({
      type: FETCH_USER,
      payload: data.user,
    });
  } catch (error) {
    // TODO: Dispatch error message.
  }
};

export const fetchUserByID = async (uuid: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.user.user}/${uuid}`;
      const data = await fetchService(url, 'GET', 'json', {
        requiresAuthorization: true,
        onFailCallback: () => logoutUser(),
      });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
