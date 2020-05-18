import Config from '../config';
import Storage from '../storage';

import { notify } from '../utils';
import { logoutUser } from './authActions';

export const postEvent = (event) => async (dispatch) => {
  try {
    const response = await fetch(
      Config.API_URL + Config.routes.events.event,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
        body: JSON.stringify({ event }),
      }
    );

    const status = await response.status;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    notify('Added an event!', event.title);
    return event;
  } catch (error) {
    notify('Unable to add events!', error.message);
    throw error;
  }
};

export const editEvent = (event) => async (dispatch) => {
  try {
    const response = await fetch(
      `${Config.API_URL + Config.routes.events.event}/${event.uuid}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
        body: JSON.stringify({ event }),
      }
    );

    const status = await response.status;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    notify('Edited an event!', event.title);
    return event;
  } catch (error) {
    notify('Unable to edit event!', error.message);
    throw error;
  }
};

export const awardPoints = (pointDetails) => async (dispatch) => {
  if (!pointDetails.points || !pointDetails.points === 0) {
    notify('Validation Error!', 'No points provided');
    throw new Error('Validation Error: No points provided');
  }
  if (!pointDetails.users || pointDetails.users.length === 0) {
    notify('Validation Error!', 'No awardees provided');
    throw new Error('Validation Error: No awardees provided');
  }
  if (!pointDetails.description) {
    notify('Validation Error!', 'Missing description field');
    throw new Error('Validation Error: Missing description field');
  }
  try {
    const response = await fetch(Config.API_URL + Config.routes.user.bonus, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({ bonus: pointDetails }),
    });

    const status = await response.status;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    notify('Gave bonus points!', `to ${pointDetails.users.length} users`);
    return pointDetails;
  } catch (error) {
    notify('Unable to award points!', error.message);
    throw error;
  }
};
