import { Response } from 'express';

import { NotFoundError, ApiValidationError } from 'errors';

const responseNotFoundMessage = (response: Response, message: string) => {
  response.status(404).json({ message });
};

const responseBadRequestMessage = (response: Response, messages: string[]) => {
  response.status(400).json({ messages });
};

const processApiError = (response: Response, ex: Error) => {
  const { message } = ex;

  if (ex instanceof NotFoundError) {
    responseNotFoundMessage(response, message);
  } else if (ex instanceof ApiValidationError) {
    responseBadRequestMessage(response, ex.errors);
  } else {
    response.status(404).json({ message });
  }
};

export default processApiError;
