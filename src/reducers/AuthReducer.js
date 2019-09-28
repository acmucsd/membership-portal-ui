import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from '../actions/types';

import Storage from '../storage';

const initialState = {
  admin: false,
  authenticated: !! Storage.get('token'),
  error: false
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error
      };
    // TODO Authentificated should not always be true.
    case AUTH_USER:
      return {
        ...state,
        admin: action.isAdmin,
        authenticated: !! Storage.get('token')
      };
    case UNAUTH_USER:
      return {
        ...state,
        admin: false,
        authenticated: false
      };
    default:
      return state;
  }
};

export default AuthReducer;
