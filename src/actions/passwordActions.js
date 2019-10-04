import { PASSWORD_FAIL, PASSWORD_SUCCESS } from './types';

import Config from '../config';
import { notify } from '../utils';

export const passwordReset = email => async dispatch => {
  try {
    const response = await fetch(Config.password + email, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ email }),
    });

    // const status = await response.status;
    // if (status === 401 || status === 403) {
    //   dispatch(logoutUser());
    //   return;
    // }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    dispatch(fetchUser());
    dispatch(fetchPastEvents());
    dispatch(fetchFutureEvents());
    dispatch({
      type: EVENT_CHECKIN,
    });
  } catch (error) {
    notify('Unable to checkin!', error.message);
    dispatch({
      type: EVENT_ERROR,
      payload: error.message,
      checkin: false,
    });
  }
};


