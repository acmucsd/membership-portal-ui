import { REGISTER_USER, REGISTER_FAIL } from '../actions/types';

const initialState = {
  user: {},
  registered: false,
  registerSuccess: false,
  error: null,
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        register: action.payload,
      };
    case REGISTER_FAIL:
      return ({
        ...state,
        register: action.payload,
      });
    default:
      return state;
  }
};

export default RegisterReducer;
