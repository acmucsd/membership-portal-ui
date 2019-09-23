import { FETCH_USER } from '../actions/types';

const initialState = {
  profile: {
    name: '',
    exp: 0,
    image: '',
    level: 0,
    rank: '',
    year: 0,
  },
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
