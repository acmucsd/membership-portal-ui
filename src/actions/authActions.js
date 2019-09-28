import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from './types';
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
***REMOVED***,
***REMOVED***

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    Storage.set('token', data.token);

    dispatch({
      type: AUTH_USER,
      isAdmin: !!tokenGetClaims(data.token).admin
***REMOVED***

    // Redirect to home on login.
    dispatch(replace('/'));
  }
  catch(error) {
    notify('Unable to login!', error.message);
    dispatch({
      type: AUTH_ERROR,
      error: error
***REMOVED***
  }
***REMOVED***

export const logoutUser = () => dispatch => {
  // TODO - Log out the user here.
  dispatch({
    type: UNAUTH_USER
  })
***REMOVED***

/**
 * Helper function to get token claims.
 * Credits to ACM @ UCLA for this function.
 *
 * @param {string} token - A jwt token returned from auth.
 * @return {object} The claims from the token.
 */
const tokenGetClaims = (token) => {
  if (!token) {
    return {***REMOVED***
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {***REMOVED***
  }
  return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
***REMOVED***
