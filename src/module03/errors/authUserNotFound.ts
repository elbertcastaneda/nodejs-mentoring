export default class AuthUserNotFound extends Error {
  constructor(
    message = 'The authenticated user is necessary to create or update entities in database'
  ) {
    super(message);

    this.name = 'AuthUserNotFound';
    Object.setPrototypeOf(this, AuthUserNotFound.prototype);
  }
}
