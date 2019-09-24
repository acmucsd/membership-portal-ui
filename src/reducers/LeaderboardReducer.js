import _ from 'lodash';

import {
  FETCH_LEADERBOARD
} from '../actions/types';

const initialState = {
  users: []
};

const LeaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      if(_.isEqual(state.users, action.payload)) {
        return {
          ...state,
        }
      }
      else {
        // Sort here to improve efficiency. Really, we shouldn't be doing this
        // array comparison at all though.
        // TODO: Look into Immutables.

        action.payload.sort((a, b) => (a.points < b.points) ? 1 : -1)
        return {
          ...state,
          users: action.payload,
        };
      }
    default:
      return state;
  }
};

export default LeaderboardReducer;
