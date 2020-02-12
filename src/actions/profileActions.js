import { PROFILE_SUCCESS, PROFILE_FAIL } from './types';
import Config from '../config';
import Storage from '../storage';
import { logoutUser } from './authActions';
import { notify } from '../utils';

export const updateProfile = (values) => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.user.user, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ user: values }),
    });

    const status = await response.status;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }
    notify('Updated profile!', 'Just now');
    dispatch({
      type: PROFILE_SUCCESS,
      payload: values
    })
  } catch(error) {
    notify('Unable to update profile!', error.message);
    dispatch({
      type: PROFILE_FAIL,
      payload: error.message,
    });
  }
};
