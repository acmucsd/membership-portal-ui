import { replace } from 'connected-react-router';
import {
  AUTH_ERROR,
  AUTH_USER,
  PASSWORD_FAIL,
  PASSWORD_SUCCESS,
  UNAUTH_USER,
  ThunkActionCreator,
} from './types';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';

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

export const loginUser: ThunkActionCreator = (values, search) => async (dispatch) => {
  try {
    if (!values.email || values.email === '') {
      throw new Error('An email is required!');
    } else if (!values.password || values.password === '') {
      throw new Error('A password is required!');
    }

    const response = await fetch(Config.API_URL + Config.routes.auth.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    Storage.set('token', data.token);
    const userData: { [key: string]: any } = tokenGetClaims(data.token);
    dispatch({
      type: AUTH_USER,
      isAdmin: userData.admin,
    });

    // Redirect to home on login.
    if (search !== '') {
      dispatch(replace(`/checkin${search}`));
    } else {
      dispatch(replace('/'));
    }
  } catch (error) {
    notify('Unable to login!', error.message);
    dispatch({
      type: AUTH_ERROR,
      error,
    });
  }
};

export const verifyToken: ThunkActionCreator = (dispatch) => async (search, pathname) => {
  return new Promise(async (resolve, reject) => {
    const token = Storage.get('token');
    if (token) {
      try {
        const response = await fetch(Config.API_URL + Config.routes.auth.verification, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!data) throw new Error('Empty response from server');
        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.authenticated) {
          // not authenticated? log out user
          dispatch({
            type: UNAUTH_USER,
          });
          notify('Login expired', 'Please sign in again');
          // redirect to /login
          dispatch(replace(`/login${search}`));
          resolve(data);
          return;
        }
        const userData: { [key: string]: any } = tokenGetClaims(token);
        dispatch({
          type: AUTH_USER,
          isAdmin: userData.admin,
        });
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
        dispatch(replace(`/login${search}`));
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

      // redirerct to /login
      dispatch(replace(`/login${search}`));
      resolve();
    }
  });
};

export const logoutUser: ThunkActionCreator = () => (dispatch) => {
  dispatch({
    type: UNAUTH_USER,
  });
  Storage.remove('token');
  dispatch(replace('/login'));
};

export const passwordReset: ThunkActionCreator = (email: string) => async (dispatch) => {
  try {
    if (!email) {
      throw new Error('Email field cannot be empty.');
    }
    const response = await fetch(`${Config.API_URL + Config.routes.auth.resetPassword}/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
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

export const updatePassword: ThunkActionCreator = (user) => async (dispatch) => {
  try {
    const response = await fetch(
      `${Config.API_URL + Config.routes.auth.resetPassword}/${user.code}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      },
    );

    const data = await response.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    dispatch(replace('/'));
  } catch (error) {
    notify('Unable to reset password!', error.message);
  }
};

// Verifies an email using a info object with email field and code field
export const verifyEmail = async (info: { [key: string]: any }) => {
  try {
    const response = await fetch(
      `${`${Config.API_URL + Config.routes.auth.emailVerification}/${info.code}`}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...info }),
      },
    );

    const data = await response.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    notify('Verified email!', '');
  } catch (error) {
    notify('Unable to verify email!', error.message);
  }
};

export const sendEmailVerification = async (email: string) => {
  try {
    const response = await fetch(
      `${`${Config.API_URL + Config.routes.auth.emailVerification}/${email}`}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    notify('Sent verification email!', '');
  } catch (error) {
    notify('Unable to send verification email!', error.message);
  }
};
