import { REGISTER_USER, REGISTER_FAIL } from '../actions/types';

const initialState = {
  registerSuccess: false,
  error: null,
***REMOVED***

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        error: false,
        registerSuccess: true,
        register: action.payload,
      ***REMOVED***
    case REGISTER_FAIL:
      return {
        ...state,
        error: true,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default RegisterReducer;
