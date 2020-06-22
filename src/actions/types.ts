import { ThunkAction } from "redux-thunk";
import { ActionCreator, AnyAction } from "redux";

export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAIL = 'PROFILE_FAIL';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAIL = 'PASSWORD_FAIL';

export const EVENT_CHECKIN = 'EVENT_CHECKIN';
export const EVENT_CHECKOUT = 'EVENT_CHECKOUT';
export const EVENT_ERROR = 'EVENT_ERROR';
export const EVENT_DELETE = 'EVENT_DELETE';
export const FETCH_FUTURE_EVENTS = 'FETCH_FUTURE_EVENTS';
export const FETCH_PAST_EVENTS = 'FETCH_PAST_EVENTS';
export const FETCH_EVENT = 'FETCH_EVENT';

export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const LEADERBOARD_ERROR = 'LEADERBOARD_ERROR';

export const FETCH_USER = 'FETCH_USER';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;