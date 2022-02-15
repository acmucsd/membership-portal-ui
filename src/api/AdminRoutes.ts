import Config from '../config';
import { notify, fetchService } from '../utils';
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
      notify('Unable to fetch emails!', error.message);
    });
};

// @Post('/admin/bonus')
export const awardPoints = async (request: CreateBonusRequest) => {
  if (!request.bonus) {
    notify('Validation Error!', 'No bonus provided');
    return;
  }

  if (!request.bonus.points) {
    notify('Validation Error!', 'No points provided');
    return;
  }

  if (!request.bonus.users || request.bonus.users.length === 0) {
    notify('Validation Error!', 'No awardees provided');
    return;
  }

  if (!request.bonus.description) {
    notify('Validation Error!', 'Missing description field');
    return;
  }

  const url = `${Config.API_URL}${Config.routes.admin.bonus}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateBonusResponse) => {
      notify('Gave bonus points!', `to ${request.bonus.users.length} users`);
      return data.emails;
    })
    .catch((error) => {
      notify('Unable to award points!', error.message);
    });
};

// @Post('/admin/attendance')
export const addAttendance = async (request: SubmitAttendanceForUsersRequest) => {
  if (!request.event) {
    notify('Validation Error!', 'No event specified');
    return;
  }

  if (!request.users || request.users.length === 0) {
    notify('Validation Error!', 'No users added');
    return;
  }

  const url = `${Config.API_URL}${Config.routes.admin.attendance}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: SubmitAttendanceForUsersResponse) => {
      notify('Success!', `Added attendance to ${data.attendances.length} user(s)!`);
      return data.attendances;
    })
    .catch((error) => {
      notify('Unable to add users!', error.message);
    });
};
