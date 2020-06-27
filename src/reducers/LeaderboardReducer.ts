import { AnyAction } from 'redux';
import { FETCH_LEADERBOARD, LEADERBOARD_ERROR } from '../actions/types';
import { getDefaultProfile } from '../utils';

const initialState = {
  users: [],
};

const LeaderboardReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_LEADERBOARD:
      // TODO: Look into Immutables.
      action.payload.map((user: { [key: string]: any }) => {
        const newUser = user;
        if (newUser.profilePicture == null) {
          newUser.profilePicture = getDefaultProfile();
        }
        return newUser;
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
