import { PASSWORD_FAIL, PASSWORD_SUCCESS } from '../actions/types';
import { AnyAction } from 'redux';

const initialState = {
  emailSuccess: false,
  error: null,
};

const PasswordReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PASSWORD_FAIL:
      return {
        ...state,
        error: true,
      };
    case PASSWORD_SUCCESS:
      return {
        ...state,
        emailSuccess: true,
        error: false,
      };
    default:
      return state;
  }
};

export default PasswordReducer;
