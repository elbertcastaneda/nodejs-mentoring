export default class UnauthorizedUserError extends Error {
  constructor(message: string = 'Unauthorized user') {
    super(message);

    this.name = 'UnauthorizedUserError';
    Object.setPrototypeOf(this, UnauthorizedUserError.prototype);
  }
}
