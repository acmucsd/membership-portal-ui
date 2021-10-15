import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const CART_ADD = 'CART_ADD';
export const CART_EDIT = 'CART_EDIT';
export const CART_REMOVE = 'CART_REMOVE';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
