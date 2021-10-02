import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const LEADERBOARD_ERROR = 'LEADERBOARD_ERROR';
export const CLEAR_LEADERBOARD = 'CLEAR_LEADERBOARD';
export const UPDATE_TIMEFRAME = 'UPDATE_TIMEFRAME';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
