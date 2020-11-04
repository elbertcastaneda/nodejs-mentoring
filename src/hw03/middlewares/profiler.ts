import { Request, Response } from 'express';
import { logger } from '_utils';

const profiler = (req: Request, res: Response, next: Function) => {
  const start = Date.now();
  res.once('finish', () => {
    const elapsedMS = Date.now() - start;
    logger.info(`method: ${req.path}(${req.method}), status: ${res.statusMessage}(${res.statusCode}), execution time(MS): ${elapsedMS}`);
  });

  next();
};

export default profiler;
