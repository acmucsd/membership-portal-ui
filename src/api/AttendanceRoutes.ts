import Config from '../config';
import { notify, fetchService } from '../utils';
import { AttendEventRequest } from './ApiRequests';
import { GetAttendancesForEventResponse, GetAttendancesForUserResponse, AttendEventResponse } from './ApiResponses';

// @Get('/attendance/:uuid')
export const fetchAttendances = async (uuid: string) => {
  const url = `${Config.API_URL}${Config.routes.attendance}/${uuid}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetAttendancesForEventResponse) => {
      return data.attendances;
    })
    .catch((error) => {
      notify('Unable to fetch attendance for event!', error.message);
    });
};

// @Get('/attendance')
export const fetchAttendance = async () => {
  const url = `${Config.API_URL}${Config.routes.attendance}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetAttendancesForUserResponse) => {
      return data.attendances;
    })
    .catch((error) => {
      notify('Unable to fetch attendance!', error.message);
    });
};

// TODO: decodeURI(info.attendanceCode)
// @Post('/attendance')
export const checkIn = async (request: AttendEventRequest) => {
  const url = `${Config.API_URL}${Config.routes.attendance}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: AttendEventResponse) => {
      return data.event;
    })
    .catch((error) => {
      notify('Unable to checkin!', error.message);
    });
};
