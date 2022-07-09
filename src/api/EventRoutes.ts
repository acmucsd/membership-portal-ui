import Config from './Config';
import FetchService from './FetchService';
import { EventSearchOptions, PatchEventRequest, CreateEventRequest } from './ApiRequests';
import {
  CreateEventResponse,
  PatchEventResponse,
  GetOneEventResponse,
  GetAllEventsResponse,
  UpdateEventCoverResponse,
  GetFutureEventsResponse,
  GetPastEventsResponse,
} from './ApiResponses';
import { generateQuery } from './Utils';

class EventRoutes {
  fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  // @Get('/event/past')
  getPastEvents = (filters?: EventSearchOptions): Promise<GetPastEventsResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.events.past}${generateQuery(filters)}`;
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

  // @Get('/event/future')
  getFutureEvents = (filters?: EventSearchOptions): Promise<GetFutureEventsResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.events.future}${generateQuery(filters)}`;
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

  // @Post('/event/picture/:uuid')
  updateEventCover = (uuid: string, formdata: FormData): Promise<UpdateEventCoverResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL + Config.events.picture}/${uuid}`;

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

  // @Get('/event/:uuid')
  getOneEvent = (uuid: string): Promise<GetOneEventResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL + Config.events.event}/${uuid}`;

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

  // @Patch('/event/:uuid')
  updateEvent = (uuid: string, request: PatchEventRequest): Promise<PatchEventResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL + Config.events.event}/${uuid}`;

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

  // @Delete('/event/:uuid')
  deleteEvent = (uuid: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const url = `${Config.API_URL}${Config.events.event}/${uuid}`;

      this.fetchService
        .fetch(url, 'DELETE', 'json', {
          requiresAuthorization: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // @Get('/event')
  getAllEvents = (filters?: EventSearchOptions): Promise<GetAllEventsResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.events.past}${generateQuery(filters)}`;
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

  // @Post('/event')
  createEvent = (request: CreateEventRequest): Promise<CreateEventResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.events.event}`;

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

export default EventRoutes;
