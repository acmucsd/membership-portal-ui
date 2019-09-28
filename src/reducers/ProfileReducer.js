import { PROFILE_SUCCESS, PROFILE_FAIL } from '../actions/types';

const initialState = {
  updateSuccess: false,
  error: false
***REMOVED***

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {  
    case PROFILE_SUCCESS:
      return {
        ...state,
        updateSuccess: true
      ***REMOVED***
    case PROFILE_FAIL:
      return {
        ...state,
        admin: action.isAdmin,
        error: true
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default ProfileReducer;
