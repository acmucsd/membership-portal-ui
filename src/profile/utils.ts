import Config from '../config';
import { fetchService, getErrorMessage, notify } from '../utils';

export const updateProfile = async (values) => {
  try {
    const url = `${Config.API_URL}${Config.routes.user.user}`;
    await fetchService(url, 'PATCH', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify({ user: values }),
    });

    notify('Updated profile!', 'Just now');
    return values;
  } catch (error) {
    notify('Unable to update profile!', getErrorMessage(error));
    throw error;
  }
};

export const uploadUserImage = async (file: string | Blob) => {
  try {
    const formdata = new FormData();
    formdata.append('image', file);

    const url = `${Config.API_URL}${Config.routes.user.profilepicture}`;
    const data = await fetchService(url, 'POST', 'image', {
      requiresAuthorization: true,
      payload: formdata,
    });

    notify('Updated profile picture!', '');
    return data;
  } catch (error) {
    notify('Unable to update profile picture!', getErrorMessage(error));
    throw error;
  }
};

export const updateEmail = async (email: string) => {
  try {
    const url = `${Config.API_URL}${Config.routes.auth.emailModification}`;

    await fetchService(url, 'POST', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify({ email }),
    });

    notify('Success!', 'Check your email to re-verify your account.');
  } catch (error) {
    notify('API Error', getErrorMessage(error));
  }
};
