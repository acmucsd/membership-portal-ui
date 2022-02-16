import Config from '../config';
import { fetchService } from '../utils';
import { PatchUserRequest } from './ApiRequests';
import { UpdateProfilePictureResponse, GetUserResponse, GetCurrentUserResponse, PatchUserResponse } from './ApiResponses';

// @Post('/user/picture')
export const updateProfilePicture = async (formdata: FormData) => {
  const url = `${Config.API_URL}${Config.routes.user.profilepicture}`;

  fetchService(url, 'POST', 'image', {
    requiresAuthorization: true,
    payload: formdata,
  })
    .then((data: UpdateProfilePictureResponse) => {
      return data.user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Get('/user/:uuid')
export const getUser = async (uuid: string) => {
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
export const getCurrentUser = async () => {
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
export const patchCurrentUser = async (request: PatchUserRequest) => {
  const url = `${Config.API_URL}${Config.routes.user.user}`;

  fetchService(url, 'PATCH', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: PatchUserResponse) => {
      return data.user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
