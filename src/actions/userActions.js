import { FETCH_USER } from './types';

import Config from '../config';
import Storage from '../storage';

export const fetchUser = uuid => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.user.user + '/' + (uuid ? uuid : ''), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const status = await response.status;
    if (status === 401 || status === 403) {
      // TODO: Logout user.
      return;
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    dispatch({
      type: FETCH_USER,
      payload: data.user,
    });
  } catch (error) {
    // TODO: Dispatch error message.
  }
};

export const fetchUserByID = async uuid => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(Config.API_URL + Config.routes.user.user + '/' + uuid, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
      });

      const status = await response.status;
      if (status === 401 || status === 403) {
        // TODO: Logout user.
        return;
      }

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
