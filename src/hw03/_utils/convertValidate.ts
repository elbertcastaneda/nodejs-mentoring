import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import processValidationErrors from './processValidationErrors';

type ClassType<T> = {
  new (...args: any[]): T;
};

async function convertValidate<T, V>(cls: ClassType<T>, plain: V) {
  const newCls = plainToClass(cls, plain);

  const errors = await validate(newCls, { skipMissingProperties: true });

  processValidationErrors(errors);

  return newCls;
}

export default convertValidate;
