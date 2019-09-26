import { REGISTER_USER } from './types';
import { replace } from 'connected-react-router';

export const registerAccount = (values) => dispatch => {
  console.log(values)
  dispatch({
    type: REGISTER_USER,
    payload: values
  })
};

export const redirectAuth= () => dispatch => {
  dispatch(replace('/authenticate-email'));
};
