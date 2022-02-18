import Config from '../config';
import fetchService from './fetchService';
import { AttendEventRequest } from './ApiRequests';
import { GetAttendancesForEventResponse, GetAttendancesForUserResponse, AttendEventResponse } from './ApiResponses';

// @Get('/attendance/:uuid')
export const getAttendancesForEvent = (uuid: string): Promise<GetAttendancesForEventResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.attendance}/${uuid}`;

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

// @Get('/attendance')
export const getAttendancesForCurrentUser = (): Promise<GetAttendancesForUserResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.attendance}`;

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

// TODO: decodeURI(info.attendanceCode)
// @Post('/attendance')
export const attendEvent = (request: AttendEventRequest): Promise<AttendEventResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.attendance}`;

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
