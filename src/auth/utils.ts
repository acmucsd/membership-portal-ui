import { Dispatch, SetStateAction } from 'react';
import { PrivateProfile } from '../api';
import backend from '../backend';
import Config from '../config';
import { userPlaceholder } from '../context';
import history from '../history';
import storage from '../storage';
import { PublicProfile } from '../types';
import { fetchService, getErrorMessage, notify } from '../utils';

/**
 * Helper function to get token claims.
 * Credits to ACM @ UCLA for this function.
 *
 * @param {string} token - A jwt token returned from auth.
 * @return {object} The claims from the token.
 */
export const tokenGetClaims = (token?: string) => {
  if (!token) {
    return {};
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {};
  }

  try {
    return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
  } catch (err) {
    return {};
  }
};

export const loginUser = async (email: string, password: string) => {
  const url = `${Config.API_URL}${Config.routes.auth.login}`;
  const data = await fetchService(url, 'POST', 'json', {
    requiresAuthorization: false,
    payload: JSON.stringify({
      email,
      password,
    }),
  });
  return data;
};

export const logoutUser = (setUser: Dispatch<SetStateAction<PrivateProfile>>) => {
  // Set the user object to placeholder data
  setUser(userPlaceholder);

  // Remove the API token so future calls aren't authenticated
  storage.remove('token');

  // Direct user to the login pace
  history.replace('/login');
};

export const updatePassword = async (user) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${user.code}`;
    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({ user }),
    });

    history.replace('/');
  } catch (error) {
    notify('Unable to reset password!', getErrorMessage(error));
  }
};

// Verifies an email using a info object with email field and code field
export const verifyEmail = async (info: { [key: string]: any }) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${info.code}`;
    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({ ...info }),
    });

    notify('Verified email!', '');
  } catch (error) {
    notify('Unable to verify email!', getErrorMessage(error));
  }
};

export const sendEmailVerification = async (email: string) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${email}`;
    await fetchService(url, 'GET', 'json', {
      requiresAuthorization: false,
    });

    notify('Sent verification email!', '');
  } catch (error) {
    notify('Unable to send verification email!', getErrorMessage(error));
  }
};

export const fetchUser = async () => {
  try {
    const data = await backend.getCurrentUser();
    return data.user;
  } catch (error) {
    notify('Unable to fetch user!', getErrorMessage(error));
    throw error;
  }
};

export const fetchUserByID = async (uuid: string) => {
  try {
    const data = await backend.getUser(uuid);
    return data.user;
  } catch (error) {
    notify('Unable to fetch user!', getErrorMessage(error));
    throw error;
  }
};
