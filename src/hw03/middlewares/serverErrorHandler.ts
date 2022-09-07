import { Request, Response } from 'express';
import { processApiError } from '_utils';

const serverErrorHandler = async (err: Error, req: Request, res: Response) => {
  processApiError(res, err);
};

export default serverErrorHandler;
