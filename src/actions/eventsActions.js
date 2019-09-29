import {
  EVENT_CHECKIN,
  EVENT_ERROR,
  FETCH_FUTURE_EVENTS,
  FETCH_PAST_EVENTS
} from './types';

import { logoutUser } from './authActions';

import Config from '../config';
import Storage from '../storage';

export const checkIn = (attendanceCode) => dispatch => {
  // TODO - Submit a request to the server to check into an event.
  const response = {
  }

  dispatch({
    type: EVENT_CHECKIN,
    payload: response,
  })
***REMOVED***

export const fetchFutureEvents = () => async dispatch => {
  try {
    const eventsRes = await fetch(Config.API_URL + Config.routes.events.future, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
***REMOVED***

    let status = await eventsRes.status;
    if (status === 401 || status === 403) {
      logoutUser();
      return;
    }

    const futureEvents = await eventsRes.json();

    if (!futureEvents) throw new Error('Empty response from server');
    else if (futureEvents.error) throw new Error(futureEvents.error.message);

    // TODO: Mark the events as checked in if the user has attended them.

    dispatch({
      type: FETCH_FUTURE_EVENTS,
      payload: futureEvents.events,
***REMOVED***
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: error,
***REMOVED***
  }
}


export const fetchPastEvents = () => async dispatch => {
  try {
    const eventsRes = await fetch(Config.API_URL + Config.routes.events.past, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.get('token')}`,
      },
***REMOVED***

    let status = await eventsRes.status;
    if (status === 401 || status === 403) {
      dispatch(logoutUser());
      return;
    }

    const pastEvents = await eventsRes.json();

    if (!pastEvents) throw new Error('Empty response from server');
    else if (pastEvents.error) throw new Error(pastEvents.error.message);

    // TODO: Mark the events as checked in if the user has attended them.

    dispatch({
      type: FETCH_PAST_EVENTS,
      payload: pastEvents.events,
***REMOVED***
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: error,
***REMOVED***
  }
}
