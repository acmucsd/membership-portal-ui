import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const EVENT_DELETE = 'EVENT_DELETE';
export const GET_EMAILS = 'GET_EMAILS';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
