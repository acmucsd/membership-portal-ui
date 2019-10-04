import { PASSWORD_FAIL, PASSWORD_SUCCESS } from './types';

const initialState = {
  emailSuccess: false,
  error: null,
};

const PasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_SUCCESS:
      return {
        ...state,
        error: false,
        emailSuccess: true,
        email: action.payload,
      };
    case PASSWORD_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default PasswordReducer;
