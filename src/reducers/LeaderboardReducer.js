import {
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR
} from '../actions/types';

const initialState = {
  users: []
***REMOVED***

const LeaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      // TODO: Look into Immutables.
      return {
        ...state,
        users: action.payload,
      ***REMOVED***
    case LEADERBOARD_ERROR:
      return {
        ...state,
        error: action.payload,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default LeaderboardReducer;
