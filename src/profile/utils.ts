import { UserPatches } from '../api';
import backend from '../backend';
import { getErrorMessage, notify } from '../utils';

export const updateProfile = async (user: UserPatches) => {
  try {
    const data = await backend.patchCurrentUser({ user });
    notify('Updated profile!', 'Just now');
    return data.user;
  } catch (error) {
    notify('Unable to update profile!', getErrorMessage(error));
    throw error;
  }
};

export const uploadUserImage = async (file: string | Blob) => {
  try {
    const formdata = new FormData();
    formdata.append('image', file);

    const data = await backend.updateProfilePicture(formdata);
    notify('Updated profile picture!', '');
    return data.user;
  } catch (error) {
    notify('Unable to update profile picture!', getErrorMessage(error));
    throw error;
  }
};

export const updateEmail = async (email: string) => {
  try {
    await backend.modifyEmail({ email });
    notify('Success!', 'Check your email to re-verify your account.');
  } catch (error) {
    notify('API Error', getErrorMessage(error));
  }
};
