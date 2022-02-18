import copy from 'copy-to-clipboard';

import Config from '../config';
import store from '../redux';

import { EVENT_DELETE, GET_EMAILS } from './adminTypes';
import fetchService from '../api/fetchService';
import { notify } from '../utils';

export const postEvent = async (event): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const eventUrl = `${Config.API_URL}${Config.routes.events.event}`;
      const data = await fetchService(eventUrl, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({
          event,
        }),
      });

      const formdata = new FormData();
      formdata.append('image', event.cover);

      const imageUrl = `${Config.API_URL + Config.routes.events.picture}/${data.event.uuid}`;
      await fetchService(imageUrl, 'POST', 'image', {
        requiresAuthorization: true,
        payload: formdata,
      });

      notify('Added an event!', event.title);
      resolve(event);
    } catch (error) {
      notify('Unable to add events!', error.message);
      reject(error);
    }
  });
};

export const editEvent = async (event): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const eventUrl = `${Config.API_URL + Config.routes.events.event}/${event.uuid}`;
      const data = await fetchService(eventUrl, 'PATCH', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({
          event,
        }),
      });

      if (typeof event.cover === 'object') {
        const formdata = new FormData();
        formdata.append('image', event.cover);

        const imageUrl = `${Config.API_URL + Config.routes.events.picture}/${data.event.uuid}`;
        await fetchService(imageUrl, 'POST', 'image', {
          requiresAuthorization: true,
          payload: formdata,
        });
      }

      notify('Edited an event!', event.title);
      resolve(event);
    } catch (error) {
      notify('Unable to edit event!', error.message);
      reject(error);
    }
  });
};

export const deleteEvent = async (uuid): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${Config.API_URL}${Config.routes.events.event}/${uuid}`;
      await fetchService(url, 'DELETE', 'json', {
        requiresAuthorization: true,
      });

      store.dispatch({
        type: EVENT_DELETE,
        uuid,
      });
      notify('Success!', 'You successfully deleted the event!');
      resolve();
    } catch (error) {
      notify('Unable to delete event!', error.message);
      reject();
    }
  });
};

export const awardPoints = async (pointDetails: any): Promise<any> => {
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
      const url = `${Config.API_URL}${Config.routes.admin.bonus}`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ bonus: pointDetails }),
      });

      notify('Gave bonus points!', `to ${pointDetails.users.length} users`);
      resolve(pointDetails);
    } catch (error) {
      notify('Unable to award points!', error.message);
      reject(error);
    }
  });
};

export const addAttendance = async (attendanceDetails: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    if (!attendanceDetails.event) {
      notify('Validation Error!', 'No event specified');
      reject();
      return;
    }
    if (!attendanceDetails.attendees || attendanceDetails.attendees.length === 0) {
      notify('Validation Error!', 'No attendees added');
      reject();
      return;
    }
    try {
      const url = `${Config.API_URL}${Config.routes.admin.attendance}`;
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({
          users: attendanceDetails.attendees,
          event: attendanceDetails.event,
          asStaff: attendanceDetails.asStaff,
        }),
      });

      notify('Success!', `Added ${attendanceDetails.attendees.length} user(s)!`);
      resolve(attendanceDetails);
    } catch (error) {
      notify('Unable to add attendees!', error.message);
      reject(error);
    }
  });
};

export const getAllEmails = async (): Promise<any> => {
  try {
    const url = `${Config.API_URL}${Config.routes.admin.email}`;
    const emails = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });
    store.dispatch({
      type: GET_EMAILS,
      payload: emails,
    });
  } catch (error) {
    notify('Unable to fetch emails!', error.message);
  }
};

export const copyLink: Function = (attendanceCode: string) => {
  if (!attendanceCode || attendanceCode === '') {
    notify('Unable to generate link!', 'An attendance code is required.');
  } else {
    copy(`${window.location.origin}/checkin?code=${encodeURIComponent(attendanceCode)}`);
    notify('Generated checkin link!', 'Link copied to the clipboard.');
  }
};
