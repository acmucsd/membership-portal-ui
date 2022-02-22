import { EVENT_CHECKIN, EVENT_CHECKOUT, EVENT_ERROR, FETCH_ATTENDANCE, FETCH_EVENT, FETCH_FUTURE_EVENTS, FETCH_PAST_EVENTS } from './eventTypes';

import { fetchUser, logoutUser } from '../auth/authActions';

import Config from '../config';
import { notify, fetchService } from '../utils';

export const fetchFutureEvents = () => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.events.future}`;
    const futureEvents = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

    dispatch({
      type: FETCH_FUTURE_EVENTS,
      payload: futureEvents.events,
    });
  } catch (error) {
    notify('Unable to fetch future events!', error.message);
    dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};

export const fetchPastEvents = () => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.events.past}`;
    const pastEvents = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

    dispatch({
      type: FETCH_PAST_EVENTS,
      payload: pastEvents.events,
    });
  } catch (error) {
    notify('Unable to fetch past events!', error.message);
    dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};

export const fetchAttendance = () => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.attendance}`;
    const data = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

    dispatch({
      type: FETCH_ATTENDANCE,
      payload: data.attendances,
    });
  } catch (error) {
    notify('Unable to fetch attendance!', error.message);
    dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};

export const checkIn = (info) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.attendance}`;
    const data = await fetchService(url, 'POST', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify({
        attendanceCode: decodeURI(info.attendanceCode),
        asStaff: info.asStaff,
      }),
      onFailCallback: () => dispatch(logoutUser()),
    });

    dispatch(fetchUser());
    dispatch(fetchAttendance());
    dispatch(fetchPastEvents());
    dispatch(fetchFutureEvents());
    dispatch({
      type: EVENT_CHECKIN,
      payload: data.event,
    });
  } catch (error) {
    notify('Unable to checkin!', error.message);
    dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};

export const checkOut = () => (dispatch) => {
  dispatch({
    type: EVENT_CHECKOUT,
  });
};

export const fetchEvent = (uuid) => async (dispatch) => {
  try {
    const url = `${Config.API_URL + Config.routes.events.event}/${uuid}`;
    const thisEvent = await fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
      onFailCallback: () => dispatch(logoutUser()),
    });

    if (!thisEvent) throw new Error('Empty response from server');
    else if (thisEvent.error) throw new Error(thisEvent.error.message);
    dispatch({
      type: FETCH_EVENT,
      payload: thisEvent.event,
    });
  } catch (error) {
    notify('Unable to fetch an event!', error.message);
    dispatch({
      type: EVENT_ERROR,
      payload: error.message,
    });
  }
};
