import Config from '../config';
import { fetchService } from '../utils';
import { LoginRequest, RegistrationRequest, PasswordResetRequest, EmailModificationRequest } from './ApiRequests';
import { RegistrationResponse, LoginResponse, VerifyAuthTokenResponse } from './ApiResponses';

// @Post('/auth/registration')
export const registerAccount = async (request: RegistrationRequest) => {
  const url = `${Config.API_URL}${Config.routes.auth.register}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: false,
    payload: JSON.stringify(request),
  })
    .then((data: RegistrationResponse) => {
      return data.user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/auth/login')
export const loginUser = async (request: LoginRequest) => {
  const url = `${Config.API_URL}${Config.routes.auth.login}`;

  await fetchService(url, 'POST', 'json', {
    requiresAuthorization: false,
    payload: JSON.stringify(request),
  })
    .then((data: LoginResponse) => {
      return data.token;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Get('/auth/emailVerification/:email')
export const sendEmailVerification = async (email: string) => {
  const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${email}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: false,
  })
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/auth/emailVerification/:accessCode')
export const verifyEmail = async (info: { [key: string]: any }) => {
  const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${info.code}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: false,
    payload: JSON.stringify({ ...info }),
  })
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/auth/emailModification')
export const updateEmail = async (request: EmailModificationRequest) => {
  const url = `${Config.API_URL}${Config.routes.auth.emailModification}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Get('/auth/passwordReset/:email')
export const passwordReset = async (email: string) => {
  if (!email) {
    throw new Error('Email field cannot be empty.');
  }

  const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${email}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: false,
  })
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/auth/passwordReset/:accessCode')
export const updatePassword = async (accessCode: string, request: PasswordResetRequest) => {
  const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${accessCode}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: false,
    payload: JSON.stringify(request),
  })
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};

// @Post('/auth/verification')
export const verifyToken = async () => {
  const url = `${Config.API_URL}${Config.routes.auth.verification}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
  })
    .then((data: VerifyAuthTokenResponse) => {
      return data.authenticated;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
