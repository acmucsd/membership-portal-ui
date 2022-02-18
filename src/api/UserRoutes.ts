import Config from '../config';
import fetchService from './fetchService';
import { PatchUserRequest } from './ApiRequests';
import { UpdateProfilePictureResponse, GetUserResponse, GetCurrentUserResponse, PatchUserResponse } from './ApiResponses';

// @Post('/user/picture')
export const updateProfilePicture = (formdata: FormData): Promise<UpdateProfilePictureResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.user.profilepicture}`;

    fetchService(url, 'POST', 'image', {
      requiresAuthorization: true,
      payload: formdata,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Get('/user/:uuid')
export const getUser = (uuid: string): Promise<GetUserResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.user.user}/${uuid}`;

    fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Get('/user')
export const getCurrentUser = (): Promise<GetCurrentUserResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.user.user}`;

    fetchService(url, 'GET', 'json', {
      requiresAuthorization: true,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Patch('/user')
export const patchCurrentUser = (request: PatchUserRequest): Promise<PatchUserResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.user.user}`;

    fetchService(url, 'PATCH', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify(request),
    })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
