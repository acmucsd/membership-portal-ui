import { FETCH_USER } from '../actions/types';
import { getDefaultProfile } from '../utils';

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    exp: 0,
    level: 0,
    rank: '',
    year: 0,
  },
  image: getDefaultProfile(),
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
