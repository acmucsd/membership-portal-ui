import { AnyAction } from 'redux';
import { PROFILE_SUCCESS, PROFILE_FAIL } from './profileTypes';

const initialState = {
  updateSuccess: false,
  error: false,
};

const ProfileReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        updateSuccess: true,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        admin: action.isAdmin,
        error: true,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
