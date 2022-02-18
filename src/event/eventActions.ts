import { EVENT_CHECKIN, EVENT_CHECKOUT, EVENT_ERROR, FETCH_ATTENDANCE, FETCH_EVENT, FETCH_FUTURE_EVENTS, FETCH_PAST_EVENTS } from './eventTypes';

import { fetchUser } from '../auth/authActions';

import Config from '../config';
import fetchService from '../api/fetchService';
import { notify } from '../utils';
import store from '../redux';

export const fetchFutureEvents = async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.events.future}`;
    const futureEvents = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    store.dispatch({
      type: FETCH_FUTURE_EVENTS,
      payload: futureEvents.events,
    });
  } catch (error) {
    notify('Unable to fetch future events!', error.message);
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};

export const fetchPastEvents = async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.events.past}`;
    const pastEvents = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    store.dispatch({
      type: FETCH_PAST_EVENTS,
      payload: pastEvents.events,
    });
  } catch (error) {
    notify('Unable to fetch past events!', error.message);
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAttendance = async () => {
  try {
    const url = `${Config.API_URL}${Config.routes.attendance}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    store.dispatch({
      type: FETCH_ATTENDANCE,
      payload: data.attendances,
    });
  } catch (error) {
    notify('Unable to fetch attendance!', error.message);
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
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

    fetchUser('');
    fetchAttendance();
    fetchPastEvents();
    fetchFutureEvents();
    store.dispatch({
      type: EVENT_CHECKIN,
      payload: data.event,
    });
  } catch (error) {
    notify('Unable to checkin!', error.message);
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};

export const checkOut = () => {
  store.dispatch({
    type: EVENT_CHECKOUT,
  });
};

export const fetchEvent = async (uuid) => {
  try {
    const url = `${Config.API_URL + Config.routes.events.event}/${uuid}`;
    const thisEvent = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    });

    if (!thisEvent) throw new Error('Empty response from server');
    else if (thisEvent.error) throw new Error(thisEvent.error.message);
    store.dispatch({
      type: FETCH_EVENT,
      payload: thisEvent.event,
    });
  } catch (error) {
    notify('Unable to fetch an event!', error.message);
    store.dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};
