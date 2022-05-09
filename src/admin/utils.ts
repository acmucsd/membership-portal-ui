import copy from 'copy-to-clipboard';
import Config from '../config';
import { fetchService, getErrorMessage, notify } from '../utils';

export const getEmails = async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.admin.emails}`;
    const emails = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });
    return emails as string[];
  } catch (error) {
    notify('Unable to fetch emails!', getErrorMessage(error));
    return [];
  }
};

export const postEvent = async (event) => {
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
    return event;
  } catch (error) {
    notify('Unable to add events!', getErrorMessage(error));
    throw error;
  }
};

export const editEvent = async (event) => {
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
    return event;
  } catch (error) {
    notify('Unable to edit event!', getErrorMessage(error));
    throw error;
  }
};

export const deleteEvent = async (uuid) => {
  try {
    const url = `${Config.API_URL}${Config.routes.events.event}/${uuid}`;
    await fetchService(url, 'DELETE', 'json', {
      requiresAuthorization: true,
    });

    notify('Success!', 'You successfully deleted the event!');
    return;
  } catch (error) {
    notify('Unable to delete event!', getErrorMessage(error));
    throw error;
  }
};

export const awardPoints = async (pointDetails: any) => {
  if (!pointDetails.points) {
    notify('Validation Error!', 'No points provided');
    throw new Error();
  }
  if (!pointDetails.users || pointDetails.users.length === 0) {
    notify('Validation Error!', 'No awardees provided');
    throw new Error();
  }
  if (!pointDetails.description) {
    notify('Validation Error!', 'Missing description field');
    throw new Error();
  }
  try {
    const url = `${Config.API_URL}${Config.routes.admin.bonus}`;
    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify({ bonus: pointDetails }),
    });

    notify('Gave bonus points!', `to ${pointDetails.users.length} users`);
    return pointDetails;
  } catch (error) {
    notify('Unable to award points!', getErrorMessage(error));
    throw error;
  }
};

export const addAttendance = async (attendanceDetails: any) => {
  if (!attendanceDetails.event) {
    notify('Validation Error!', 'No event specified');
    throw new Error();
  }
  if (!attendanceDetails.attendees || attendanceDetails.attendees.length === 0) {
    notify('Validation Error!', 'No attendees added');
    throw new Error();
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
    return attendanceDetails;
  } catch (error) {
    notify('Unable to add attendees!', getErrorMessage(error));
    throw error;
  }
};

export const copyLink = (attendanceCode: string) => {
  if (!attendanceCode || attendanceCode === '') {
    notify('Unable to generate link!', 'An attendance code is required.');
  } else {
    copy(`${window.location.origin}/checkin?code=${encodeURIComponent(attendanceCode)}`);
    notify('Generated checkin link!', 'Link copied to the clipboard.');
  }
};
