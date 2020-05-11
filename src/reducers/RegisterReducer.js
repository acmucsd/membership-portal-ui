import { REGISTER_USER, REGISTER_FAIL } from '../actions/types';

const initialState = {
  registerSuccess: false,
  error: null,
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        error: false,
        registerSuccess: true,
        register: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default RegisterReducer;
