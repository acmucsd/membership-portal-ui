import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const EVENT_CHECKIN = 'EVENT_CHECKIN';
export const EVENT_CHECKOUT = 'EVENT_CHECKOUT';
export const EVENT_ERROR = 'EVENT_ERROR';
export const FETCH_ATTENDANCE = 'FETCH_ATTENDANCE';
export const FETCH_EVENT = 'FETCH_EVENT';
export const FETCH_FUTURE_EVENTS = 'FETCH_FUTURE_EVENTS';
export const FETCH_PAST_EVENTS = 'FETCH_PAST_EVENTS';
export const UPDATE_TIMEFRAME = 'UPDATE_TIMEFRAME';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
