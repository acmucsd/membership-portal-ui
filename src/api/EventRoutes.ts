import Config from '../config';
import fetchService from './fetchService';
import { generateQuery } from '../utils';
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

// @Get('/event/past')
export const getPastEvents = (filters?: EventSearchOptions): Promise<GetPastEventsResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.events.past}${generateQuery(filters)}`;
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

// @Get('/event/future')
export const getFutureEvents = (filters?: EventSearchOptions): Promise<GetFutureEventsResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.events.future}${generateQuery(filters)}`;
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

// @Post('/event/picture/:uuid')
export const updateEventCover = (uuid: string, formdata: FormData): Promise<UpdateEventCoverResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL + Config.routes.events.picture}/${uuid}`;

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

// @Get('/event/:uuid')
export const getOneEvent = (uuid: string): Promise<GetOneEventResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL + Config.routes.events.event}/${uuid}`;

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

// @Patch('/event/:uuid')
export const updateEvent = (uuid: string, request: PatchEventRequest): Promise<PatchEventResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL + Config.routes.events.event}/${uuid}`;

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

// @Delete('/event/:uuid')
export const deleteEvent = (uuid: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.events.event}/${uuid}`;

    fetchService(url, 'DELETE', 'json', {
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
export const getAllEvents = (filters?: EventSearchOptions): Promise<GetAllEventsResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.events.past}${generateQuery(filters)}`;
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

// @Post('/event')
export const createEvent = (request: CreateEventRequest): Promise<CreateEventResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.events.event}`;

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
