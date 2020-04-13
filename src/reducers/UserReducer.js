import { FETCH_USER } from '../actions/types';
import { getDefaultProfile } from '../utils';

let defaultProfile = getDefaultProfile();
const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    points: 0,
    graduationYear: 0,
    profilePicture: defaultProfile
  },
  error: null,
***REMOVED***

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      if (action.payload.profilePicture == null) {
        action.payload.profilePicture = defaultProfile;
      }
      return {
        ...state,
        profile: action.payload,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default UserReducer;
