import _ from 'lodash';

import {
  EVENT_CHECKIN,
  EVENT_ERROR,
  FETCH_FUTURE_EVENTS,
  FETCH_PAST_EVENTS
} from '../actions/types';

const initialState = {
  events: [],
  futureEvents: [],
  pastEvents: [],
  error: null
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_CHECKIN:
      // TODO: Locate the event in the events array and mark as checked in.
      return {
        ...state,
      };
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
        };
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
        };
      }
    case EVENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EventsReducer;
