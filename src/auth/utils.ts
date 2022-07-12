import { UserRegistration } from '../api';
import backend from '../backend';
import history from '../history';
import Storage from '../storage';
import { getErrorMessage, notify } from '../utils';

export const loginUser = async (values: { email: string; password: string }, search: string) => {
  try {
    const { email, password } = values;
    const data = await backend.login({ email, password });
    const { token } = data;
    Storage.set('token', token);

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
  }
};

export const logoutUser = () => {
  // Set the user object to placeholder data
  // setUser(userPlaceholder);
  // TODO: STEETS

  // Remove the API token so future calls aren't authenticated
  Storage.remove('token');

  // Direct user to the login pace
  history.replace('/login');
};

export const verifyToken = async (search: string, pathname: string) => {
  const token = Storage.get('token');
  if (token) {
    try {
      const data = await backend.verifyAuthToken();

      if (!data.authenticated) {
        // not authenticated? log out user
        logoutUser();
        notify('Login expired', 'Please sign in again');

        // redirect to /login
        history.replace(`/login${search}`);
      }
    } catch (error) {
      notify('Unable to verify token!', getErrorMessage(error) || 'Try logging in again');

      // log out user due to probably faulty token
      logoutUser();

      // redirerct to /login
      history.replace(`/login${search}`);
      throw error;
    }
  } else {
    // log out user due to no token
    logoutUser();

    if (pathname.toString() !== '/') {
      notify('Not Authenticated', 'Please sign in or register for an account before continuing.');
    }

    // redirerct to /login, while including the checkin code and desired destination if present
    const path = pathname.toString();
    const uri = encodeURIComponent(path);
    const dest = `${search.toString() ? '&' : '?'}destination=${uri}`;
    history.replace(`/login${search}${path !== '/' ? dest : ''}`);
  }
};

export const updatePassword = async (user) => {
  try {
    await backend.resetPassword(user.code, { user });
    history.replace('/');
  } catch (error) {
    notify('Unable to reset password!', getErrorMessage(error));
  }
};

// Verifies an email using a info object with email field and code field
export const verifyEmail = async (info: { [key: string]: any }) => {
  try {
    await backend.verifyEmail(info);
    notify('Verified email!', '');
  } catch (error) {
    notify('Unable to verify email!', getErrorMessage(error));
  }
};

export const sendEmailVerification = async (email: string) => {
  try {
    await backend.resendEmailVerification(email);
    notify('Sent verification email!', '');
  } catch (error) {
    notify('Unable to send verification email!', getErrorMessage(error));
  }
};

export const fetchUser = async () => {
  try {
    const data = await backend.getCurrentUser();
    return data.user;
  } catch (error) {
    notify('Unable to fetch user!', getErrorMessage(error));
    throw error;
  }
};

export const fetchUserByID = async (uuid: string) => {
  try {
    const data = await backend.getUser(uuid);
    return data.user;
  } catch (error) {
    notify('Unable to fetch user!', getErrorMessage(error));
    throw error;
  }
};

export const passwordReset = async (email: string) => {
  try {
    if (!email) {
      throw new Error('Email field cannot be empty.');
    }

    await backend.sendPasswordResetEmail(email);
    notify('Success! Check your email shortly', `Email has been sent to ${email}`);
  } catch (error) {
    notify('Error with email!', getErrorMessage(error));
    throw error;
  }
};

export const registerAccount = async (user: UserRegistration, search: string) => {
  try {
    await backend.register({ user });

    // TODO: Redirect to auth, then log user in on register.
    // For now just login.
    loginUser({ email: user.email, password: user.password }, search);
  } catch (error) {
    notify('Unable to register account!', getErrorMessage(error));
    throw error;
  }
};
