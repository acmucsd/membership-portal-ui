import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const FETCH_USER = 'FETCH_USER';
export const PASSWORD_FAIL = 'PASSWORD_FAIL';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const REGISTER_USER = 'REGISTER_USER';
export const UNAUTH_USER = 'UNAUTH_USER';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
