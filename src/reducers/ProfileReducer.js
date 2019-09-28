import { PROFILE_SUCCESS, PROFILE_FAIL } from '../actions/types';

const initialState = {
  updateSuccess: false,
  error: false
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {  
    case PROFILE_SUCCESS:
      return {
        ...state,
        updateSuccess: true
      };
    case PROFILE_FAIL:
      return {
        ...state,
        admin: action.isAdmin,
        error: true
      };
    default:
      return state;
  }
};

export default ProfileReducer;
