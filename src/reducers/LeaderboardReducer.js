import {
  FETCH_LEADERBOARD,
  LEADERBOARD_ERROR
} from '../actions/types';

const initialState = {
  users: []
};

const LeaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      // TODO: Look into Immutables.
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
