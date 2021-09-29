import _ from 'lodash';

import { AnyAction } from 'redux';
import {
  EVENT_CHECKIN,
  EVENT_CHECKOUT,
  EVENT_ERROR,
  FETCH_ATTENDANCE,
  FETCH_FUTURE_EVENTS,
  FETCH_PAST_EVENTS,
  FETCH_EVENT,
  UPDATE_TIMEFRAME,
} from './eventTypes';

const initialState = {
  attendance: [],
  currentEvent: {},
  event: {},
  futureEvents: [],
  pastEvents: [],
  checkin: false,
  timeframe: 'All Time',
  error: null,
};

const EventsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case EVENT_CHECKIN:
      return {
        ...state,
        checkin: true,
        currentEvent: action.payload,
      };
    case EVENT_CHECKOUT:
      return {
        ...state,
        checkin: false,
      };
    case FETCH_FUTURE_EVENTS:
      if (_.isEqual(state.futureEvents, action.payload)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        futureEvents: action.payload,
      };

    case FETCH_PAST_EVENTS:
      if (_.isEqual(state.pastEvents, action.payload)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        pastEvents: action.payload,
      };

    case UPDATE_TIMEFRAME:
      return {
        ...state,
        timeframe: action.payload,
      };

    case FETCH_EVENT:
      if (_.isEqual(state.event, action.payload)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        event: action.payload,
      };

    case FETCH_ATTENDANCE:
      if (_.isEqual(state.attendance, action.payload)) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        attendance: action.payload,
      };

    case EVENT_ERROR:
      return {
        ...state,
        checkin: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EventsReducer;
