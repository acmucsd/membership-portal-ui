import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from '../actions/types';
import { AnyAction } from 'redux';

const initialState = {
  admin: false,
  authenticated: false,
  error: false,
};

const AuthReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    // call this when we are authorizing a user, so authenticated: true default
    case AUTH_USER:
      return {
        ...state,
        admin: action.isAdmin,
        authenticated: true,
      };
    case UNAUTH_USER:
      return {
        ...state,
        admin: false,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
