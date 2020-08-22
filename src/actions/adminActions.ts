import Config from '../config';
import Storage from '../storage';

import { EVENT_DELETE, ThunkActionCreator } from './types';
import { notify } from '../utils';
import { logoutUser } from './authActions';

export const postEvent: ThunkActionCreator = (event) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
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

      const { status } = response;
      if (status === 401 || status === 403) {
        dispatch(logoutUser());
      }

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);

      notify('Added an event!', event.title);
      resolve(event);
    } catch (error) {
      notify('Unable to add events!', error.message);
      reject(error);
    }
  });
};

export const editEvent: ThunkActionCreator = (event) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${Config.API_URL + Config.routes.events.event}/${event.uuid}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
        body: JSON.stringify({ event }),
      });

      const { status } = response;
      if (status === 401 || status === 403) {
        dispatch(logoutUser());
      }

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);

      notify('Edited an event!', event.title);
      resolve(event);
    } catch (error) {
      notify('Unable to edit event!', error.message);
      reject(error);
    }
  });
};

export const deleteEvent: ThunkActionCreator = (uuid) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${Config.API_URL + Config.routes.events.event}/${uuid}`, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Storage.get('token')}`,
        },
      });

      const { status } = response;
      if (status === 401 || status === 403) {
        dispatch(logoutUser());
      }

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);
      if (data.numDeleted === 1) {
        dispatch({
          type: EVENT_DELETE,
          uuid,
        });
        notify('Success!', 'You successfully deleted the event!');
        resolve('Deleted');
      } else {
        notify('Unable to delete event!', "Couldn't find the event in the database");
        reject(new Error('Delete failed'));
      }
    } catch (error) {
      notify('Unable to delete event!', error.message);
      reject(error);
    }
  });
};

export const awardPoints: ThunkActionCreator = (pointDetails: any) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    if (!pointDetails.points) {
      notify('Validation Error!', 'No points provided');
      reject();
      return;
    }
    if (!pointDetails.users || pointDetails.users.length === 0) {
      notify('Validation Error!', 'No awardees provided');
      reject();
      return;
    }
    if (!pointDetails.description) {
      notify('Validation Error!', 'Missing description field');
      reject();
      return;
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

      const { status } = response;
      if (status === 401 || status === 403) {
        dispatch(logoutUser());
      }

      const data = await response.json();
      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);

      notify('Gave bonus points!', `to ${pointDetails.users.length} users`);
      resolve(pointDetails);
    } catch (error) {
      notify('Unable to award points!', error.message);
      reject(error);
    }
  });
};

export const editCollection: ThunkActionCreator = (newData) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${Config.API_URL + Config.routes.store.collection}/${newData.uuid}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Storage.get('token')}`,
          },
          body: JSON.stringify({ 'collection': newData.data }),
        }
      );

      const { status } = response;
      if (status === 401 || status === 403) {
        dispatch(logoutUser());
      }

      const data = await response.json();

      if (!data) throw new Error('Empty response from server');
      if (data.error) throw new Error(data.error.message);

      notify('Collection changes successfully saved!', data.collection.title);
      resolve(data);
    } catch (error) {
      notify('Some or all collection changes could not be saved!', error.message);
      reject(error);
    }
  });
};
