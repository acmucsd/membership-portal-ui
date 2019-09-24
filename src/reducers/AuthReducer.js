import { AUTH_USER, UNAUTH_USER } from '../actions/types';

const initialState = {
  admin: false,
  authentificated: false
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // TODO Authentificated should not always be true.
    case AUTH_USER:
      return {
        ...state,
        admin: false,
        authentificated: true
      };
    case UNAUTH_USER:
      return {
        ...state,
        admin: false,
        authentificated: false
      };
    default:
      return state;
  }
};

export default AuthReducer;
