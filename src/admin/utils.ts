import copy from 'copy-to-clipboard';
import { Bonus, Event, SubmitAttendanceForUsersRequest } from '../api';
import backend from '../backend';
import { getErrorMessage, notify } from '../utils';

export const getEmails = async () => {
  try {
    const data = await backend.getAllEmails();
    return data.emails;
  } catch (error) {
    notify('Unable to fetch emails!', getErrorMessage(error));
    return [];
  }
};

export const postEvent = async (event: Event) => {
  try {
    const data = await backend.createEvent({ event });

    const formdata = new FormData();
    formdata.append('image', event.cover);
    await backend.updateEventCover(data.event.uuid, formdata);

    notify('Added an event!', event.title);
    return event;
  } catch (error) {
    notify('Unable to add events!', getErrorMessage(error));
    throw error;
  }
};

export const editEvent = async (event: any) => {
  try {
    const data = await backend.updateEvent(event.uuid, { event });

    if (typeof event.cover === 'object') {
      const formdata = new FormData();
      formdata.append('image', event.cover);

      await backend.updateEventCover(data.event.uuid, formdata);
    }

    notify('Edited an event!', event.title);
    return event;
  } catch (error) {
    notify('Unable to edit event!', getErrorMessage(error));
    throw error;
  }
};

export const deleteEvent = async (uuid: string) => {
  try {
    await backend.deleteEvent(uuid);
    notify('Success!', 'You successfully deleted the event!');
  } catch (error) {
    notify('Unable to delete event!', getErrorMessage(error));
    throw error;
  }
};

export const awardPoints = async (bonus: Bonus) => {
  if (!bonus.points) {
    notify('Validation Error!', 'No points provided');
    throw new Error();
  }
  if (!bonus.users || bonus.users.length === 0) {
    notify('Validation Error!', 'No awardees provided');
    throw new Error();
  }
  if (!bonus.description) {
    notify('Validation Error!', 'Missing description field');
    throw new Error();
  }
  try {
    const data = await backend.addBonus({ bonus });
    notify('Gave bonus points!', `to ${data.emails.length} users`);
    return data.emails;
  } catch (error) {
    notify('Unable to award points!', getErrorMessage(error));
    throw error;
  }
};

export const addAttendance = async (attendanceDetails: SubmitAttendanceForUsersRequest) => {
  if (!attendanceDetails.event) {
    notify('Validation Error!', 'No event specified');
    throw new Error();
  }
  if (!attendanceDetails.users || attendanceDetails.users.length === 0) {
    notify('Validation Error!', 'No attendees added');
    throw new Error();
  }
  try {
    const data = await backend.submitAttendanceForUsers(attendanceDetails);
    notify('Success!', `Added attendances for ${data.attendances.length} user(s)!`);
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
