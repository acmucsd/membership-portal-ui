import Config from '../config';
import { fetchService, getErrorMessage, notify } from '../utils';

export const fetchFutureEvents = async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.events.future}`;
    const futureEvents = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    return futureEvents.events;
  } catch (error) {
    notify('Unable to fetch future events!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const fetchPastEvents = async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.events.past}`;
    const pastEvents = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    return pastEvents.events;
  } catch (error) {
    notify('Unable to fetch past events!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const fetchAttendance = async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.attendance}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    return data.attendances;
  } catch (error) {
    notify('Unable to fetch attendance!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const checkIn = async (info) => {
  try {
    const url = `${Config.API_URL}${Config.routes.attendance}`;
    const data = await fetchService(url, 'POST', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify({
        attendanceCode: decodeURI(info.attendanceCode),
        asStaff: info.asStaff,
      }),
    });

    return data.event;
  } catch (error) {
    notify('Unable to checkin!', getErrorMessage(error));
    throw error;
  }
};

export const fetchEvent = async (uuid) => {
  try {
    const url = `${Config.API_URL + Config.routes.events.event}/${uuid}`;
    const event = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    if (!event) throw new Error('Empty response from server');
    else if (event.error) throw new Error(event.error.message);
    return event.event;
  } catch (error) {
    notify('Unable to fetch an event!', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};
