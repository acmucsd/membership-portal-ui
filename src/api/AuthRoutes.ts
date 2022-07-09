import Config from './Config';
import FetchService from './FetchService';
import { LoginRequest, RegistrationRequest, PasswordResetRequest, EmailModificationRequest } from './ApiRequests';
import { RegistrationResponse, LoginResponse, VerifyAuthTokenResponse } from './ApiResponses';

class AuthRoutes {
  private fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  // @Post('/auth/registration')
  register = (request: RegistrationRequest): Promise<RegistrationResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.auth.register}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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
  login = async (request: LoginRequest): Promise<LoginResponse> => {
    return new Promise(async (resolve, reject) => {
      const url = `${Config.API_URL}${Config.auth.login}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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
  resendEmailVerification = (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.auth.emailVerification}/${email}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
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
  verifyEmail = (info: { [key: string]: any }): Promise<void> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.auth.emailVerification}/${info.code}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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
  modifyEmail = (request: EmailModificationRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.auth.emailModification}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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
  sendPasswordResetEmail = (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject(new Error('Email field cannot be empty.'));
      }

      const url = `${Config.API_URL}${Config.auth.resetPassword}/${email}`;

      this.fetchService
        .fetch(url, 'GET', 'json', {
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
  resetPassword = (accessCode: string, request: PasswordResetRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.auth.resetPassword}/${accessCode}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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
  verifyAuthToken = (): Promise<VerifyAuthTokenResponse> => {
    return new Promise((resolve, reject) => {
      const url = `${Config.API_URL}${Config.auth.verification}`;

      this.fetchService
        .fetch(url, 'POST', 'json', {
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
}

export default AuthRoutes;
