import { AnyAction } from 'redux';
import { CLEAR_LEADERBOARD, FETCH_LEADERBOARD, LEADERBOARD_ERROR } from './leaderboardTypes';
import { getDefaultProfile } from '../utils';

const initialState = {
  users: [],
  /** Maps offset value used to the users fetched */
  offsetToUsers: new Map(),
};

const LeaderboardReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CLEAR_LEADERBOARD: {
      state.users = [];
      state.offsetToUsers = new Map();
      return initialState;
    }
    case FETCH_LEADERBOARD: {
      // TODO: Look into Immutables.
      action.payload.map((user: { [key: string]: any }) => {
        const newUser = user;
        if (newUser.profilePicture == null) {
          newUser.profilePicture = getDefaultProfile();
        }
        return newUser;
      });
      state.offsetToUsers.set(action.offset, action.payload);
      const keysarr: number[] = [];
      // @ts-ignore
      // eslint-disable-next-line no-restricted-syntax
      for (const key of state.offsetToUsers.keys()) {
        keysarr.push(key);
      }
      keysarr.sort((a, b) => a - b);
      const users: any[] = [];
      for (let i = 0; i < keysarr.length; i += 1) {
        users.push(...state.offsetToUsers.get(keysarr[i]));
      }
      return {
        ...state,
        users,
      };
    }
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
