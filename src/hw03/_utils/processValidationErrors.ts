import { ValidationError } from 'class-validator';
import { ApiValidationError } from 'errors';

const processValidationErrors = (validationErrors: ValidationError[]) => {
  if (validationErrors.length > 0) {
    const errors = validationErrors.reduce((acc, { constraints }) => {
      if (!constraints) {
        return acc;
      }

      acc.push(...Object.entries(constraints).map(([constrain, msg]) => `[${constrain}]: ${msg}`));

      return acc;
    }, [] as string[]);

    throw new ApiValidationError(errors);
  }
};

export default processValidationErrors;
