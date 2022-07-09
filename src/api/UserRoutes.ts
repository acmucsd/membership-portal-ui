import Config from './Config';
import FetchService from './FetchService';
import { PatchUserRequest } from './ApiRequests';
import { UpdateProfilePictureResponse, GetUserResponse, GetCurrentUserResponse, PatchUserResponse } from './ApiResponses';

class UserRoutes {
  fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  // @Post('/user/picture')
  updateProfilePicture = (formdata: FormData): Promise<UpdateProfilePictureResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.user.profilepicture}`;

      this.fetchService
        .fetch(url, 'POST', 'image', {
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
  getUser = (uuid: string): Promise<GetUserResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.user.user}/${uuid}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
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
  getCurrentUser = (): Promise<GetCurrentUserResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.user.user}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
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
  patchCurrentUser = (request: PatchUserRequest): Promise<PatchUserResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.user.user}`;

      this.fetchService
        .fetch(url, 'PATCH', 'json', {
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
}

export default UserRoutes;
