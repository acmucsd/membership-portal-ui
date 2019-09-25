import { REGISTER_USER } from './types';

export const registerAccount = (values) => dispatch => {
  // TODO - Log in the user here.
  console.log("meow")
  dispatch({
    type: REGISTER_USER
  })
};
