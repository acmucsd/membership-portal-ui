import { EVENT_CHECKIN, FETCH_FUTURE_EVENTS, FETCH_PAST_EVENTS } from './types';

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
  // TODO - Submit a request to get the future events.

  const futureEvents = [
    {
      title: 'Fall Kickoff',
      cover: 'http://placekitten.com/g/200/300',
      description: 'Inaugural GBM.',
      committee: '',
      location: 'PC East Ball Room',
      start: 'September 29 6:00PM',
      end: 'September 29 9:00PM',
      attendanceCode: '@cmuc5d',
      pointValue: 20,
    },
    {
      title: 'Pool and Ping Pong',
      cover: 'http://placekitten.com/g/200/300',
      description: 'Game night.',
      committee: '',
      location: 'PC Game Room',
      start: 'October 8 6:00PM',
      end: 'October 8 8:00PM',
      attendanceCode: 'p0ng',
      pointValue: 10,
    },
    {
      title: 'Hack School - NodeJS',
      cover: 'http://placekitten.com/g/200/300',
      description: 'Learn Node.',
      committee: '',
      location: 'PC ERC Room',
      start: 'October 15 6:00PM',
      end: 'October 15 8:00PM',
      attendanceCode: 'n0d3',
      pointValue: 30,
    },
  ]

  dispatch({
    type: FETCH_FUTURE_EVENTS,
    payload: futureEvents,
  });
}


export const fetchPastEvents = () => async dispatch => {
  // TODO - Submit a request to get the past events.

  const pastEvents = [
    {
      title: 'Past Event',
      cover: 'http://placekitten.com/g/200/300',
      description: 'No events have passed yet',
      committee: '',
      location: 'PC East Ball Room',
      start: 'September 18 10:00AM',
      end: 'September 18 3:00PM',
      attendanceCode: 'p@5t',
      pointValue: 20,
    },
  ]

  dispatch({
    type: FETCH_PAST_EVENTS,
    payload: pastEvents,
  });
}
