import _ from 'lodash';

import {
  EVENT_CHECKIN,
  FETCH_FUTURE_EVENTS,
  FETCH_PAST_EVENTS
} from '../actions/types';

const initialState = {
  events: [],
  futureEvents: [],
  pastEvents: [],
***REMOVED***

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_CHECKIN:
      // TODO: Locate the event in the events array and mark as checked in.
      return {
        ...state,
      ***REMOVED***
    case FETCH_FUTURE_EVENTS:
      if(_.isEqual(state.futureEvents, action.payload)) {
        return {
          ...state,
        }
      }
      else {
        return {
          ...state,
          futureEvents: action.payload,
        ***REMOVED***
      }
    case FETCH_PAST_EVENTS:
      if(_.isEqual(state.pastEvents, action.payload)) {
        return {
          ...state,
        }
      }
      else {
        return {
          ...state,
          pastEvents: action.payload,
        ***REMOVED***
      }
    default:
      return state;
  }
***REMOVED***

export default EventsReducer;
