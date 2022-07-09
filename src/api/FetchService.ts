import { HttpRequestMethod, MimeType, FetchServiceOptions } from '../types';

/**
 * Recursive function to print all errors from back-end.
 *
 * @param error the current error.
 * @returns the error message.
 */
const getServiceErrorMessage = (error) => {
  let messages = '';
  if (error.constraints) {
    Object.values(error.constraints).forEach((message) => {
      messages += message;
    });
  }
  const { children } = error;
  for (let i = 0; i < children.length; i += 1) {
    messages += `${getServiceErrorMessage(children[i])} `;
  }
  return messages;
};

class FetchService {
  logoutHandler?: Function;

  constructor(logoutHandler?: Function) {
    this.logoutHandler = logoutHandler;
  }

  async fetch(url: string, requestMethod: HttpRequestMethod, mimeType: MimeType, options: FetchServiceOptions) {
    const { payload, requiresAuthorization } = options;

    let Accept;
    let ContentType;

    switch (mimeType) {
      case 'json':
        Accept = 'application/json';
        ContentType = 'application/json';
        break;
      case 'image':
        Accept = 'multipart/form-data';
        break;
      default:
        break;
    }

    const response = await fetch(url, {
      method: requestMethod,
      headers: {
        Accept,
        ...(ContentType && { 'Content-Type': ContentType }), // set content-type if json or image
        ...(requiresAuthorization && { Authorization: `Bearer ${localStorage.getItem('token')}` }), // set bearer token if needed
      },
      ...(payload && { body: payload }), // set payload if provided
    });

    const { status } = response;
    if (status === 401 || status === 403) {
      if (this.logoutHandler) {
        this.logoutHandler();
        return {}; // return an empty response in case logoutHandler doesn't end this function's execution
      }

      throw new Error('Unauthorized response from server');
    }

    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) {
      let { message } = data.error;
      if (status === 400 && data.error.errors) {
        let messages = '';
        const { errors } = data.error;
        for (let i = 0; i < errors.length; i += 1) {
          messages += `${getServiceErrorMessage(errors[i])} `;
        }
        message = messages;
      }
      throw new Error(message);
    }

    return data;
  }
}

export default FetchService;
