import { FETCH_USER } from '../actions/types';
import { getDefaultProfile } from '../utils';

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    points: 0,
    graduationYear: 0,
  },
  image: getDefaultProfile(),
  error: null,
***REMOVED***

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        profile: action.payload,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default UserReducer;
