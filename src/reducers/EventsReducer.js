import { EVENT_CHECKIN } from '../actions/types';

const initialState = {
  events: [],
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_CHECKIN:
      // TODO: Locate the event in the events array and mark as checked in.
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default EventsReducer;
