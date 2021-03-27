import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const EVENT_DELETE = 'EVENT_DELETE';
export const FETCH_EMAILS = 'FETCH_EMAILS';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
