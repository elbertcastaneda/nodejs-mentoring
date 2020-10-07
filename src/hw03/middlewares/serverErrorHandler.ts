import { NextFunction, Request, Response } from 'express';
import { processApiError } from 'api/_utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverErrorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  processApiError(res, err);
};

export default serverErrorHandler;
