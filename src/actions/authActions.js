import { AUTH_ERROR, AUTH_USER, UNAUTH_USER, PASSWORD_FAIL, PASSWORD_SUCCESS } from './types';
import { replace } from 'connected-react-router';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';

export const loginUser = (values) => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.auth.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      }),
    });

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    Storage.set('token', data.token);

    dispatch({
      type: AUTH_USER,
      isAdmin: !!tokenGetClaims(data.token).admin
    });

    // Redirect to home on login.
    dispatch(replace('/'));
  }
  catch(error) {
    notify('Unable to login!', error.message);
    dispatch({
      type: AUTH_ERROR,
      error: error
    });
  }
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: UNAUTH_USER
  })
  Storage.remove('token');
  dispatch(replace('/login'));
};

/**
 * Helper function to get token claims.
 * Credits to ACM @ UCLA for this function.
 *
 * @param {string} token - A jwt token returned from auth.
 * @return {object} The claims from the token.
 */
const tokenGetClaims = (token) => {
  if (!token) {
    return {};
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {};
  }
  return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
};

export const passwordReset = email => async dispatch => {
  try {
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
    notify('Success! Check your email shortly', "Email has been sent to " + email);
    dispatch({
      type: PASSWORD_SUCCESS,
    });
  } catch (error) {
    notify('Error with email!', error.message);
    dispatch({
      type: PASSWORD_FAIL,
      payload: error.message,
      error: true,
    });
  }
};
