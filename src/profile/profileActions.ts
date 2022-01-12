import { PROFILE_FAIL, PROFILE_SUCCESS, ThunkActionCreator } from './profileTypes';
import Config from '../config';
import { logoutUser } from '../auth/authActions';
import { notify, fetchService } from '../utils';

export const updateProfile: ThunkActionCreator = (values) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.user.user}`;
    await fetchService(url, 'PATCH', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify({ user: values }),
      onFailCallback: () => dispatch(logoutUser()),
    });

    notify('Updated profile!', 'Just now');
    dispatch({
      type: PROFILE_SUCCESS,
      payload: values,
    });
  } catch (error) {
    notify('Unable to update profile!', error.message);
    dispatch({
      type: PROFILE_FAIL,
      payload: error.message,
    });
  }
};

export const uploadUserImage = async (file: string | Blob) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formdata = new FormData();
      formdata.append('image', file);

      const url = `${Config.API_URL}${Config.routes.user.profilepicture}`;
      const data = await fetchService(url, 'POST', 'image', {
        requiresAuthorization: true,
        payload: formdata,
        onFailCallback: () => logoutUser(),
      });

      notify('Updated profile picture!', '');
      resolve(data);
    } catch (error) {
      notify('Unable to update profile picture!', error.message);
      reject(error);
    }
  });
};

export const updateEmail = (email: string) => async (dispatch) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.emailModification}`;

    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify({ email }),
      onFailCallback: () => dispatch(logoutUser()),
    });

    notify('Success!', 'Check your email to re-verify your account.');
  } catch (error) {
    notify('API Error', error.message);
  }
};
