import Config from '../config';
import { notify, fetchService, generateQuery } from '../utils';
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
export const getPastEvents = async (filters?: EventSearchOptions) => {
  const url = `${Config.API_URL}${Config.routes.events.past}${generateQuery(filters)}`;
  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetPastEventsResponse) => {
      return data.events;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Get('/event/future')
export const getFutureEvents = async (filters?: EventSearchOptions) => {
  const url = `${Config.API_URL}${Config.routes.events.future}${generateQuery(filters)}`;
  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetFutureEventsResponse) => {
      return data.events;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/event/picture/:uuid')
export const updateEventCover = async (uuid: string, formdata: FormData) => {
  const url = `${Config.API_URL + Config.routes.events.picture}/${uuid}`;

  fetchService(url, 'POST', 'image', {
    requiresAuthorization: true,
    payload: formdata,
  })
    .then((data: UpdateEventCoverResponse) => {
      return data.event;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Get('/event/:uuid')
export const getOneEvent = async (uuid: string) => {
  const url = `${Config.API_URL + Config.routes.events.event}/${uuid}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOneEventResponse) => {
      return data.event;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Patch('/event/:uuid')
export const updateEvent = async (uuid: string, request: PatchEventRequest) => {
  const eventUrl = `${Config.API_URL + Config.routes.events.event}/${uuid}`;

  fetchService(eventUrl, 'PATCH', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: PatchEventResponse) => {
      return data.event;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Delete('/event/:uuid')
export const deleteEvent = async (uuid: string) => {
  const url = `${Config.API_URL}${Config.routes.events.event}/${uuid}`;

  await fetchService(url, 'DELETE', 'json', {
    requiresAuthorization: true,
  })
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Get('/event')
export const getAllEvents = async (filters?: EventSearchOptions) => {
  const url = `${Config.API_URL}${Config.routes.events.past}${generateQuery(filters)}`;
  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetAllEventsResponse) => {
      return data.events;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/event')
export const createEvent = async (request: CreateEventRequest) => {
  const url = `${Config.API_URL}${Config.routes.events.event}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateEventResponse) => {
      return data.event;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
