import { EVENT_CHECKIN } from './types';

export const checkIn = (attendanceCode) => dispatch => {
  // TODO - Submit a request to the server to check into an event.
  const response = {
  }

  dispatch({
    type: EVENT_CHECKIN,
    response: response,
  })
};
