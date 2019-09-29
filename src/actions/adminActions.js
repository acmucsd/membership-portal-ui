import Config from '../config';
import Storage from '../storage';

import { notify } from '../utils';
import { logoutUser } from './authActions';

export const postEvent = (event) => async dispatch => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.events.event, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ event }),
    });

    const status = await response.status;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    notify('Added an event!', event.title);
  } catch (error) {
    notify('Unable to add events!', error.message);
  }
};
