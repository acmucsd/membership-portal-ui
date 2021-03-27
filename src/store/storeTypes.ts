import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
