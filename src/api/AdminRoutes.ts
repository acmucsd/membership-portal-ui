import Config from '../config';
import fetchService from './fetchService';
import { CreateBonusRequest, SubmitAttendanceForUsersRequest } from './ApiRequests';
import { CreateBonusResponse, GetAllEmailsResponse, SubmitAttendanceForUsersResponse } from './ApiResponses';

// @Get('/admin/email')
export const getAllEmails = (): Promise<GetAllEmailsResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.admin.email}`;

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

// @Post('/admin/bonus')
export const addBonus = (request: CreateBonusRequest): Promise<CreateBonusResponse> => {
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

    const url = `${Config.API_URL}${Config.routes.admin.bonus}`;

    fetchService(url, 'POST', 'json', {
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
export const submitAttendanceForUsers = (request: SubmitAttendanceForUsersRequest): Promise<SubmitAttendanceForUsersResponse> => {
  return new Promise((resolve, reject) => {
    if (!request.event) {
      reject(new Error('No event specified'));
    }

    if (!request.users || request.users.length === 0) {
      reject(new Error('No users added'));
    }

    const url = `${Config.API_URL}${Config.routes.admin.attendance}`;

    fetchService(url, 'POST', 'json', {
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
