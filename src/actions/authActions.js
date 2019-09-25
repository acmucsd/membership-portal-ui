import { AUTH_USER, UNAUTH_USER } from './types';
import { replace } from 'connected-react-router';

export const loginUser = (values) => dispatch => {
  // TODO - Log in the user here.
  dispatch({
    type: AUTH_USER
  })
***REMOVED***

export const logoutUser = () => dispatch => {
  // TODO - Log out the user here.
  dispatch({
    type: UNAUTH_USER
  })
***REMOVED***

export const redirectHome= () => dispatch => {
  dispatch(replace('/'));
***REMOVED***
