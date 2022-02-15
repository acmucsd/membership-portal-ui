import Config from '../config';
import { notify, fetchService } from '../utils';
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
      notify('Unable to register account!', error.message);
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
      notify('Unable to login!', error.message);
    });
};

// @Get('/auth/emailVerification/:email')
export const sendEmailVerification = async (email: string) => {
  const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${email}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: false,
  })
    .then(() => {
      notify('Sent verification email!', '');
    })
    .catch((error) => {
      notify('Unable to send verification email!', error.message);
    });
};

// @Post('/auth/emailVerification/:accessCode')
export const verifyEmail = async (info: { [key: string]: any }) => {
  const url = `${Config.API_URL}${Config.routes.auth.emailVerification}/${info.code}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: false,
    payload: JSON.stringify({ ...info }),
  })
    .then(() => {
      notify('Verified email!', '');
    })
    .catch((error) => {
      notify('Unable to verify email!', error.message);
    });
};

// @Post('/auth/emailModification')
export const updateEmail = async (request: EmailModificationRequest) => {
  const url = `${Config.API_URL}${Config.routes.auth.emailModification}`;

  fetchService(url, 'POST', 'json', {
    requiresAuthorization: true,
    payload: JSON.stringify(request),
  })
    .then(() => {
      notify('Success!', 'Check your email to re-verify your account.');
    })
    .catch((error) => {
      notify('API Error', error.message);
    });
};

// @Get('/auth/passwordReset/:email')
export const passwordReset = async (email: string) => {
  if (!email) {
    notify('Email field cannot be empty.', '');
    return;
  }

  const url = `${Config.API_URL}${Config.routes.auth.resetPassword}/${email}`;

  fetchService(url, 'GET', 'json', {
    requiresAuthorization: false,
  })
    .then(() => {
      notify('Success! Check your email shortly', `Email has been sent to ${email}`);
    })
    .catch((error) => {
      notify('Error with email!', error.message);
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
      notify('Unable to reset password!', error.message);
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
      notify('Unable to reset password!', error.message);
    });
};
