import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from '../actions/types';

const initialState = {
  admin: false,
  authenticated: false,
  error: false
***REMOVED***

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error
      ***REMOVED***
    // TODO Authentificated should not always be true.
    case AUTH_USER:
      return {
        ...state,
        admin: action.isAdmin,
        authenticated: true
      ***REMOVED***
    case UNAUTH_USER:
      return {
        ...state,
        admin: false,
        authenticated: false
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default AuthReducer;
