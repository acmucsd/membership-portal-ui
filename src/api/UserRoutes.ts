import Config from '../config';
import { fetchService, notify } from '../utils';
import { PatchUserRequest } from './ApiRequests';
import {
  GetUserActivityStreamResponse,
  UpdateProfilePictureResponse,
  GetUserResponse,
  GetCurrentUserResponse,
  PatchUserResponse,
} from './ApiResponses';

// @Post('/user/picture')
export const uploadUserImage = async (formdata: FormData) => {
  const url = `${Config.API_URL}${Config.routes.user.profilepicture}`;

  fetchService(url, 'POST', 'image', {
    requiresAuthorization: true,
    payload: formdata,
  })
    .then((data: UpdateProfilePictureResponse) => {
      notify('Updated profile picture!', '');
      return data.user;
    })
    .catch((error) => {
      notify('Unable to update profile picture!', error.message);
    });
};

// @Get('/user/:uuid')
export const fetchUserByID = async (uuid: string) => {
  const url = `${Config.API_URL}${Config.routes.user.user}/${uuid}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetUserResponse) => {
      return data.user;
    })
    .catch((error) => {
      throw error;
    });
};

// @Get('/user')
export const fetchUser = async () => {
  const url = `${Config.API_URL}${Config.routes.user.user}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetCurrentUserResponse) => {
      return data.user;
    })
    .catch((error) => {
      throw error;
    });
};

// @Patch('/user')
export const updateProfile = async (request: PatchUserRequest) => {
  const url = `${Config.API_URL}${Config.routes.user.user}`;

  fetchService(url, 'PATCH', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: PatchUserResponse) => {
      notify('Updated profile!', 'Just now');
      return data.user;
    })
    .catch((error) => {
      notify('Unable to update profile!', error.message);
      throw error;
    });
};
