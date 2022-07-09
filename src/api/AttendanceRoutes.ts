import Config from './Config';
import FetchService from './FetchService';
import { AttendEventRequest } from './ApiRequests';
import { GetAttendancesForEventResponse, GetAttendancesForUserResponse, AttendEventResponse } from './ApiResponses';

class AttendanceRoutes {
  fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  // @Get('/attendance/:uuid')
  getAttendancesForEvent = (uuid: string): Promise<GetAttendancesForEventResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.attendance}/${uuid}`;

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

  // @Get('/attendance')
  getAttendancesForCurrentUser = (): Promise<GetAttendancesForUserResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.attendance}`;

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

  // TODO: decodeURI(info.attendanceCode)
  // @Post('/attendance')
  attendEvent = (request: AttendEventRequest): Promise<AttendEventResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.attendance}`;

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

export default AttendanceRoutes;
