import { AUTH_USER, UNAUTH_USER } from '../actions/types';

const initialState = {
  admin: false,
  authenticated: false
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // TODO Authentificated should not always be true.
    case AUTH_USER:
      return {
        ...state,
        admin: false,
        authenticated: true
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
