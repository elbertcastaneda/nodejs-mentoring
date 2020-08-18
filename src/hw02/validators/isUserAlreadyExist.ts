/* eslint-disable class-methods-use-this */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { NotFoundError } from 'errors';
import UserRepository from 'api/users/user.repository';
import UserModel from 'api/users/user.model';

@ValidatorConstraint({ async: false, name: 'isUserAlreadyExistConstraint' })
class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(login: string, { object }: ValidationArguments) {
    const currentUser = object as UserModel;
    const repository = UserRepository.create();

    try {
      const user = repository.getByLogin(login);

      if (user.id === currentUser.id) {
        return true;
      }

      return false;
    } catch (ex) {
      if (ex instanceof NotFoundError) {
        return false;
      }

      return true;
    }
  }

  public defaultMessage() {
    return 'User with login $value already exists. Choose another login.';
  }
}

export default function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function IsUserAlreadyExistDecorator(object: Object, propertyName: string) {
    registerDecorator({
      propertyName,
      constraints: [],
      options: validationOptions,
      target: object.constructor,
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
