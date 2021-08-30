import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';

export const CART_ADDITION = 'CART_ADDITION';
export const CART_REMOVAL = 'CART_REMOVAL';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
