import { PASSWORD_FAIL, PASSWORD_SUCCESS } from './types';

import Config from '../config';
import { notify } from '../utils';

export const passwordReset = email => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.auth.password, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

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
