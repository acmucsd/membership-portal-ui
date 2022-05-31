// seems reasonable to put all errors in this file
/* eslint-disable max-classes-per-file */

export class UserError extends Error {
  public message: string;

  constructor(message: string) {
    super();

    Object.setPrototypeOf(this, UserError.prototype);
    this.message = message;
  }
}

export class AuthError extends Error {
  public message: string;

  constructor(message: string) {
    super();

    Object.setPrototypeOf(this, AuthError.prototype);
    this.message = message;
  }
}
