export default class ValidationError extends Error {
  errors: string[];

  constructor(errors: string[]) {
    super(errors.join(', '));

    this.errors = errors;
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
