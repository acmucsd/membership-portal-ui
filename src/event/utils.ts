import backend from '../backend';
import { getErrorMessage, notify } from '../utils';

export const fetchFutureEvents = async () => {
  try {
    const data = await backend.getFutureEvents();
    return data.events;
  } catch (error) {
    notify('Unable to fetch future events!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const fetchPastEvents = async () => {
  try {
    const data = await backend.getPastEvents();
    return data.events;
  } catch (error) {
    notify('Unable to fetch past events!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const fetchAttendance = async () => {
  try {
    const data = await backend.getAttendancesForCurrentUser();
    return data.attendances;
  } catch (error) {
    notify('Unable to fetch attendance!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const checkIn = async (info: { attendanceCode: string; asStaff?: boolean }) => {
  try {
    const data = await backend.attendEvent({
      attendanceCode: decodeURI(info.attendanceCode),
      asStaff: info.asStaff,
    });
    return data.event;
  } catch (error) {
    notify('Unable to checkin!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const fetchEvent = async (uuid: string) => {
  try {
    const data = await backend.getOneEvent(uuid);
    return data.event;
  } catch (error) {
    notify('Unable to fetch an event!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};
