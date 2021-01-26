import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const PROFILE_FAIL = 'PROFILE_FAIL';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
