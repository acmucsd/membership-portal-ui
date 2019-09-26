import { REGISTER_USER } from './types';

export const registerAccount = (values) => dispatch => {
  console.log(values)
  dispatch({
    type: REGISTER_USER,
    payload: values
  })
};
