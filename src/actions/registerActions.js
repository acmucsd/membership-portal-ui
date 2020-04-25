import { REGISTER_FAIL, REGISTER_USER } from './types';
import { replace } from 'connected-react-router';

import Config from '../config';
import { loginUser } from './authActions';
import { notify } from '../utils';

export const registerAccount = user => async dispatch => {
  try {
    if (user.password !== user.confirmpassword) {
      throw new Error('Passwords do not match!');
    }

    const response = await fetch(Config.API_URL + Config.routes.auth.register, {
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
    dispatch({
      type: REGISTER_USER,
      payload: user,
***REMOVED***
    // TODO: Redirect to auth, then log user in on register.
    // For now just login.
    dispatch(
      loginUser({
        email: user.email,
        password: user.password,
***REMOVED***
***REMOVED***;
  } catch (error) {
    notify('Unable to register account!', error.message);
    dispatch({
      type: REGISTER_FAIL,
      error: error,
***REMOVED***
  }
***REMOVED***

export const redirectAuth = () => dispatch => {
  dispatch(replace('/authenticate-email'));
***REMOVED***
