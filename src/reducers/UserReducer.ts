import { FETCH_USER } from '../actions/types';
import { getDefaultProfile } from '../utils';
import { AnyAction } from 'redux';

const defaultProfile = getDefaultProfile();
const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    points: 0,
    graduationYear: 0,
    profilePicture: defaultProfile,
  },
  error: null,
};

const UserReducer = (state = initialState, action: AnyAction) => {
  const newAction = action;
  switch (newAction.type) {
    case FETCH_USER:
      if (newAction.payload.profilePicture == null) {
        newAction.payload.profilePicture = defaultProfile;
      }
      return {
        ...state,
        profile: newAction.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
