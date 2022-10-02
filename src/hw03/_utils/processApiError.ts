import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { StatusCodes } from 'http-status-codes';

import {
  ApiValidationError,
  BadRequestError,
  NotFoundError,
  UnauthorizedUserError,
} from '~/errors';

interface QueryFailedErrorDetailed extends QueryFailedError {
  code: string;
  detail: string;
}

const responseNotFoundMessage = (response: Response, message: string) => {
  response.status(StatusCodes.NOT_FOUND).json({ message });
};

const responseBadRequestMessages = (response: Response, messages: string[]) => {
  response.status(StatusCodes.BAD_REQUEST).json({ messages });
};

const responseBadRequestMessage = (response: Response, message: string) => {
  response.status(StatusCodes.BAD_REQUEST).json({ message });
};

const responseUnAuthorizedMessage = (response: Response, message: string) => {
  response.status(StatusCodes.UNAUTHORIZED).json({ message });
};

export const isApiError = (ex: Error) => {
  if (ex instanceof ApiValidationError) {
    return true;
  }

  if (ex instanceof BadRequestError) {
    return true;
  }

  if (ex instanceof NotFoundError) {
    return true;
  }

  if (ex instanceof UnauthorizedUserError) {
    return true;
  }

  if (ex instanceof QueryFailedError) {
    return true;
  }

  return false;
};

const processApiError = (response: Response, ex: Error) => {
  const { message } = ex;

  if (ex instanceof ApiValidationError) {
    responseBadRequestMessages(response, ex.errors);
  } else if (ex instanceof BadRequestError) {
    responseBadRequestMessage(response, message);
  } else if (ex instanceof NotFoundError) {
    responseNotFoundMessage(response, message);
  } else if (ex instanceof UnauthorizedUserError) {
    responseUnAuthorizedMessage(response, message);
  } else if (ex instanceof QueryFailedError) {
    const error = ex as QueryFailedErrorDetailed;

    if (error.code === '23505') {
      responseBadRequestMessage(response, error.detail);
    } else {
      responseBadRequestMessage(response, message);
    }
  } else {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Server error: ${message}` });
  }
};

export default processApiError;
