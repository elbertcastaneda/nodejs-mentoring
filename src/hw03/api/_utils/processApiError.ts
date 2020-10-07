import { Response } from 'express';

import { ApiValidationError, BadRequestError, NotFoundError } from 'errors';

const responseNotFoundMessage = (response: Response, message: string) => {
  response.status(404).json({ message });
};

const responseBadRequestMessages = (response: Response, messages: string[]) => {
  response.status(400).json({ messages });
};

const responseBadRequestMessage = (response: Response, message: string) => {
  response.status(400).json({ message });
};

const processApiError = (response: Response, ex: Error) => {
  const { message } = ex;

  if (ex instanceof ApiValidationError) {
    responseBadRequestMessages(response, ex.errors);
  } else if (ex instanceof BadRequestError) {
    responseBadRequestMessage(response, message);
  } else if (ex instanceof NotFoundError) {
    responseNotFoundMessage(response, message);
  } else {
    response.status(500).json({ message: `Server error: ${message}` });
  }
};

export default processApiError;
