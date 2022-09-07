import { Request, Response } from 'express';

const simpleLogger = (req: Request, res: Response, next: Function) => {
  // eslint-disable-next-line no-console
  console.log(
    `method: ${req.path}(${req.method}), query: ${JSON.stringify(
      req.query
    )}, body: ${JSON.stringify(req.body)}`
  );
  next();
};

export default simpleLogger;
