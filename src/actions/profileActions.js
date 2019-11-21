import { PROFILE_SUCCESS, PROFILE_FAIL } from './types';

export const updateProfile = (values) => (dispatch) => {
  dispatch({
    type: PROFILE_SUCCESS,
    payload: values,
  });
};
