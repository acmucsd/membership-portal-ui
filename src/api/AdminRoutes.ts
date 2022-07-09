import Config from './Config';
import FetchService from './FetchService';
import { CreateBonusRequest, SubmitAttendanceForUsersRequest } from './ApiRequests';
import { CreateBonusResponse, GetAllEmailsResponse, SubmitAttendanceForUsersResponse } from './ApiResponses';

class AdminRoutes {
  private fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  // @Get('/admin/email')
  getAllEmails = (): Promise<GetAllEmailsResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.admin.email}`;

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

  // @Post('/admin/bonus')
  addBonus = (request: CreateBonusRequest): Promise<CreateBonusResponse> => {
    return new Promise((resolve, reject) => {
      if (!request.bonus) {
        reject(new Error('No bonus provided'));
      }

      if (!request.bonus.points) {
        reject(new Error('No points provided'));
      }

      if (!request.bonus.users || request.bonus.users.length === 0) {
        reject(new Error('No awardees provided'));
      }

      if (!request.bonus.description) {
        reject(new Error('Missing description field'));
      }

      const url = `${Config.API_URL}${Config.admin.bonus}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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

  // @Post('/admin/attendance')
  submitAttendanceForUsers = (request: SubmitAttendanceForUsersRequest): Promise<SubmitAttendanceForUsersResponse> => {
    return new Promise((resolve, reject) => {
      if (!request.event) {
        reject(new Error('No event specified'));
      }

      if (!request.users || request.users.length === 0) {
        reject(new Error('No users added'));
      }

      const url = `${Config.API_URL}${Config.admin.attendance}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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

export default AdminRoutes;
