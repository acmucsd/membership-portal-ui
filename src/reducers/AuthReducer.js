import { UNAUTH_USER } from '../actions/types';

const initialState = {
  admin: false,
  authentificated: false
***REMOVED***

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNAUTH_USER:
      return {
        ...state,
        admin: false,
        authentificated: false
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default AuthReducer;
