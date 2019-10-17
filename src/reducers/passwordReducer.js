import { PASSWORD_FAIL, PASSWORD_SUCCESS } from '../actions/types';

const initialState = {
  emailSuccess: false,
  error: null,
***REMOVED***

const PasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_FAIL:
      return {
        ...state,
        error: true,
      ***REMOVED***
    case PASSWORD_SUCCESS:
      return {
        ...state,
        emailSuccess: true,
        error: false,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default PasswordReducer;
