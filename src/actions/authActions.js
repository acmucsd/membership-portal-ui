import { AUTH_ERROR, AUTH_USER, PASSWORD_FAIL, PASSWORD_SUCCESS, UNAUTH_USER } from './types';
import { replace } from 'connected-react-router';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';

export const loginUser = values => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.auth.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
***REMOVED***,
***REMOVED***

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    Storage.set('token', data.token);
    const userData = tokenGetClaims(data.token);
    dispatch({
      type: AUTH_USER,
      isAdmin: userData.admin
***REMOVED***

    // Redirect to home on login.
    dispatch(replace('/'));
  } catch (error) {
    notify('Unable to login!', error.message);
    dispatch({
      type: AUTH_ERROR,
      error: error,
***REMOVED***
  }
***REMOVED***

export const verifyToken = (dispatch) =>
  async () => {
  return new Promise( async (resolve, reject) => {
    const token = Storage.get('token');
    if (token) {
      try {
        const response = await fetch(Config.API_URL + Config.routes.auth.verification, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
  ***REMOVED***;

        const data = await response.json();
        if (!data) throw new Error('Empty response from server');
        if (data.error) {
           throw new Error(data.error.message);
        }

        if (!data.authenticated) {
          // not authenticated? log out user
    ***REMOVED***
            type: UNAUTH_USER
    ***REMOVED***;
          notify('Login expired', 'Please sign in again');
          // redirect to /login
          dispatch(replace('/login'));
          resolve(data);
          return;
        }
        const userData = tokenGetClaims(token);
  ***REMOVED***
          type: AUTH_USER,
          isAdmin: userData.admin
  ***REMOVED***;
        resolve(data);

      } catch (error) {
        notify('Unable to verify token!', error.message || "Try logging in again");

  ***REMOVED***
          type: AUTH_ERROR,
          error: error,
  ***REMOVED***;

        // log out user due to probably faulty token
  ***REMOVED***
          type: UNAUTH_USER
  ***REMOVED***;
        // redirerct to /login
        dispatch(replace('/login'));
        reject(error);
      }
    }
    else {
      // log out user due to no token
***REMOVED***
        type: UNAUTH_USER
***REMOVED***;
      // redirerct to /login
      dispatch(replace('/login'));
      resolve();
    }
  })
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: UNAUTH_USER,
  });
  Storage.remove('token');
  dispatch(replace('/login'));
***REMOVED***

/**
 * Helper function to get token claims.
 * Credits to ACM @ UCLA for this function.
 *
 * @param {string} token - A jwt token returned from auth.
 * @return {object} The claims from the token.
 */
const tokenGetClaims = token => {
  if (!token) {
    return {***REMOVED***
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {***REMOVED***
  }
  return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
***REMOVED***

export const passwordReset = email => async dispatch => {
  try {
    const response = await fetch(`${Config.API_URL + Config.routes.auth.resetPassword}/${email}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
***REMOVED***
    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    notify('Success! Check your email shortly', 'Email has been sent to ' + email);
    dispatch({
      type: PASSWORD_SUCCESS,
***REMOVED***
  } catch (error) {
    notify('Error with email!', error.message);
    dispatch({
      type: PASSWORD_FAIL,
      payload: error.message,
***REMOVED***
  }
***REMOVED***

export const updatePassword = user => async dispatch => {
  try {
    const response = await fetch(`${Config.API_URL +
      Config.routes.auth.resetPassword}/${user.code}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
***REMOVED***

    const data = await response.json();

    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    dispatch(replace('/'));
  } catch (error) {
    notify('Unable to reset password!', error.message);
  }
***REMOVED***
