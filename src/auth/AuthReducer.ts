import { AnyAction } from 'redux';
import {
  AUTH_ERROR,
  AUTH_USER,
  FETCH_USER,
  UNAUTH_USER,
  PASSWORD_FAIL,
  PASSWORD_SUCCESS,
  REGISTER_USER,
  REGISTER_FAIL,
} from './authTypes';

import { getDefaultProfile } from '../utils';

const defaultProfile = getDefaultProfile();

const initialState = {
  admin: false,
  authenticated: false,
  error: false,
  emailSuccess: false,
  registerSuccess: false,
  profile: {
    firstName: '',
    lastName: '',
    points: 0,
    graduationYear: 0,
    profilePicture: defaultProfile,
  },
};

const AuthReducer = (state = initialState, action: AnyAction) => {
  const newAction = action;
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    // call this when we are authorizing a user, so authenticated: true default
    case AUTH_USER:
      return {
        ...state,
        admin: action.isAdmin,
        authenticated: true,
      };
    case FETCH_USER:
      if (newAction.payload.profilePicture == null) {
        newAction.payload.profilePicture = defaultProfile;
      }
      return {
        ...state,
        profile: newAction.payload,
      };
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
    case UNAUTH_USER:
      return {
        ...state,
        admin: false,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
