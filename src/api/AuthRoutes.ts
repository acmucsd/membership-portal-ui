import Config from '../config';
import fetchService from './fetchService';
import { LoginRequest, RegistrationRequest, PasswordResetRequest, EmailModificationRequest } from './ApiRequests';
import { RegistrationResponse, LoginResponse, VerifyAuthTokenResponse } from './ApiResponses';

// @Post('/auth/registration')
export const register = (request: RegistrationRequest): Promise<RegistrationResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.auth.register}`;

    fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
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

// @Post('/auth/login')
export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  return new Promise(async (resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.auth.login}`;

    fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
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

// @Get('/auth/emailVerification/:email')
export const resendEmailVerification = (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${email}`;

    fetchService(url, 'GET', 'json', {
      requiresAuthorization: false,
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Post('/auth/emailVerification/:accessCode')
export const verifyEmail = (info: { [key: string]: any }): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${info.code}`;

    fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify({ ...info }),
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Post('/auth/emailModification')
export const modifyEmail = (request: EmailModificationRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.auth.emailModification}`;

    fetchService(url, 'POST', 'json', {
      requiresAuthorization: true,
      payload: JSON.stringify(request),
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Get('/auth/passwordReset/:email')
export const sendPasswordResetEmail = (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject(new Error('Email field cannot be empty.'));
    }

    const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${email}`;

    fetchService(url, 'GET', 'json', {
      requiresAuthorization: false,
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Post('/auth/passwordReset/:accessCode')
export const resetPassword = (accessCode: string, request: PasswordResetRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${accessCode}`;

    fetchService(url, 'POST', 'json', {
      requiresAuthorization: false,
      payload: JSON.stringify(request),
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// @Post('/auth/verification')
export const verifyAuthToken = (): Promise<VerifyAuthTokenResponse> => {
  return new Promise((resolve, reject) => {
    const url = `${Config.API_URL}${Config.routes.auth.verification}`;

    fetchService(url, 'POST', 'json', {
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
