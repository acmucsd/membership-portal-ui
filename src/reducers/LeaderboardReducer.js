import { FETCH_LEADERBOARD, LEADERBOARD_ERROR } from '../actions/types';
import { getDefaultProfile } from '../utils';

const initialState = {
  users: [],
***REMOVED***

const LeaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      // TODO: Look into Immutables.
      action.payload.forEach(user => {
        if (user.profilePicture == null) {
          user.profilePicture = getDefaultProfile();
        }
***REMOVED***;
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
