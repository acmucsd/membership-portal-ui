import { EVENT_CHECKIN } from '../actions/types';

const initialState = {
  events: [],
***REMOVED***

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_CHECKIN:
      // TODO: Locate the event in the events array and mark as checked in.
      return {
        ...state,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default EventsReducer;
