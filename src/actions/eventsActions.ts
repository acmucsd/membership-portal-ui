import {
  EVENT_CHECKIN,
  EVENT_CHECKOUT,
  EVENT_ERROR,
  FETCH_ATTENDANCE,
  FETCH_FUTURE_EVENTS,
  FETCH_PAST_EVENTS,
  FETCH_EVENT,
  ThunkActionCreator,
} from './types';

import { fetchUser } from './userActions';
import { logoutUser } from './authActions';

import Config from '../config';
import Storage from '../storage';
import { notify } from '../utils';

export const fetchFutureEvents: ThunkActionCreator = () => async (dispatch) => {
  try {
    const eventsRes = await fetch(Config.API_URL + Config.routes.events.future, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const { status } = eventsRes;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }

    const futureEvents = await eventsRes.json();

    if (!futureEvents) throw new Error('Empty response from server');
    else if (futureEvents.error) throw new Error(futureEvents.error.message);

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

export const fetchPastEvents: ThunkActionCreator = () => async (dispatch) => {
  try {
    const eventsRes = await fetch(Config.API_URL + Config.routes.events.past, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const { status } = eventsRes;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }

    const pastEvents = await eventsRes.json();

    if (!pastEvents) throw new Error('Empty response from server');
    else if (pastEvents.error) throw new Error(pastEvents.error.message);

    pastEvents.events.reverse();

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

export const fetchAttendance: ThunkActionCreator = () => async (dispatch) => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.attendance.fetch, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const { status } = response;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

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

export const checkIn: ThunkActionCreator = (info) => async (dispatch) => {
  try {
    const response = await fetch(Config.API_URL + Config.routes.attendance.attend, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
      body: JSON.stringify({
        attendanceCode: info.attendanceCode,
        asStaff: info.asStaff,
      }),
    });

    const { status } = response;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

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

export const checkOut: ThunkActionCreator = () => (dispatch) => {
  dispatch({
    type: EVENT_CHECKOUT,
  });
};

export const fetchEvent: ThunkActionCreator = (uuid) => async (dispatch) => {
  try {
    const eventRes = await fetch(`${Config.API_URL + Config.routes.events.event}/${uuid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
    });

    const { status } = eventRes;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }

    const thisEvent = await eventRes.json();

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
