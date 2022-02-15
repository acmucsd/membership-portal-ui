import Config from '../config';
import { notify, fetchService } from '../utils';
import { PatchEventRequest, CreateEventRequest } from './ApiRequests';
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
export const fetchPastEvents = async () => {
  const url = `${Config.API_URL}${Config.routes.events.past}`;
  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetPastEventsResponse) => {
      return data.events;
    })
    .catch((error) => {
      notify('Unable to fetch past events!', error.message);
    });
};

// @Get('/event/future')
export const fetchFutureEvents = async () => {
  const url = `${Config.API_URL}${Config.routes.events.future}`;
  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetFutureEventsResponse) => {
      return data.events;
    })
    .catch((error) => {
      notify('Unable to fetch future events!', error.message);
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
      notify('Unable to update event cover!', error.message);
    });
};

// @Get('/event/:uuid')
export const fetchEvent = async (uuid: string) => {
  const url = `${Config.API_URL + Config.routes.events.event}/${uuid}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetOneEventResponse) => {
      return data.event;
    })
    .catch((error) => {
      notify('Unable to fetch an event!', error.message);
    });
};

// @Patch('/event/:uuid')
export const editEvent = async (uuid: string, request: PatchEventRequest) => {
  const eventUrl = `${Config.API_URL + Config.routes.events.event}/${uuid}`;

  fetchService(eventUrl, 'PATCH', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: PatchEventResponse) => {
      notify('Edited an event!', data.event.title);
      return data.event;
    })
    .catch((error) => {
      notify('Unable to edit event!', error.message);
    });
};

// @Delete('/event/:uuid')
export const deleteEvent = async (uuid: string) => {
  const url = `${Config.API_URL}${Config.routes.events.event}/${uuid}`;

  await fetchService(url, 'DELETE', 'json', {
    requiresAuthorization: true,
  })
    .then(() => {
      notify('Success!', 'You successfully deleted the event!');
    })
    .catch((error) => {
      notify('Unable to delete event!', error.message);
    });
};

// @Get('/event')
export const fetchAllEvents = async () => {
  const url = `${Config.API_URL}${Config.routes.events.past}`;
  fetchService(url, 'GET', 'json', {
    requiresAuthorization: true,
  })
    .then((data: GetAllEventsResponse) => {
      return data.events;
    })
    .catch((error) => {
      notify('Unable to fetch past events!', error.message);
    });
};

// @Post('/event')
export const postEvent = async (request: CreateEventRequest) => {
  const url = `${Config.API_URL}${Config.routes.events.event}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then((data: CreateEventResponse) => {
      notify('Added an event!', data.event.title);
      return data.event;
    })
    .catch((error) => {
      notify('Unable to add event!', error.message);
    });
};
