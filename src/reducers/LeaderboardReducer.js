import { FETCH_LEADERBOARD, LEADERBOARD_ERROR } from '../actions/types';
import { getDefaultProfile } from '../utils';

const initialState = {
  users: [],
};

const LeaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      // TODO: Look into Immutables.
      action.payload.forEach(user => {
        if (user.profilePicture == null) {
          user.profilePicture = getDefaultProfile();
        }
      });
      return {
        ...state,
        users: action.payload,
      };
    case LEADERBOARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default LeaderboardReducer;
