import Config from '../config';
import { fetchService } from '../utils';
import { CreateBonusRequest, SubmitAttendanceForUsersRequest } from './ApiRequests';
import { CreateBonusResponse, GetAllEmailsResponse, SubmitAttendanceForUsersResponse } from './ApiResponses';

// @Get('/admin/email')
export const getAllEmails = async () => {
  const url = `${Config.API_URL}${Config.routes.admin.email}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetAllEmailsResponse) => {
      return data.emails;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/admin/bonus')
export const addBonus = async (request: CreateBonusRequest) => {
  if (!request.bonus) {
    throw new Error('No bonus provided');
  }

  if (!request.bonus.points) {
    throw new Error('No points provided');
  }

  if (!request.bonus.users || request.bonus.users.length === 0) {
    throw new Error('No awardees provided');
  }

  if (!request.bonus.description) {
    throw new Error('Missing description field');
  }

  const url = `${Config.API_URL}${Config.routes.admin.bonus}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateBonusResponse) => {
      return data.emails;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/admin/attendance')
export const submitAttendanceForUsers = async (request: SubmitAttendanceForUsersRequest) => {
  if (!request.event) {
    throw new Error('No event specified');
  }

  if (!request.users || request.users.length === 0) {
    throw new Error('No users added');
  }

  const url = `${Config.API_URL}${Config.routes.admin.attendance}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: SubmitAttendanceForUsersResponse) => {
      return data.attendances;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
