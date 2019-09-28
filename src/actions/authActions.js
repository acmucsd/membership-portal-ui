import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from './types';
import { replace } from 'connected-react-router';

import Config from '../config';

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

    // TODO: Store token in a cookie.
    dispatch({
      type: AUTH_USER,
      // TODO: Check Admin Token
      isAdmin: true
    });

    // Redirect to home on login.
    dispatch(replace('/'));
  }
  catch(error) {
    dispatch({
      type: AUTH_ERROR,
      error: error
    });
  }
};

export const logoutUser = () => dispatch => {
  // TODO - Log out the user here.
  dispatch({
    type: UNAUTH_USER
  })
};
