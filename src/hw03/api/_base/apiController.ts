import { Request, Response, Router } from 'express';

import { NotFoundError, ValidationError } from 'errors';

const uuidPatternRE = '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
const prefixApi = '/api';
const createPath = (prefixPath: string, path = '') => `${prefixApi}/${prefixPath}/${path}`;

const responseNotFoundMessage = (response: Response, message: string) => {
  response.status(404).json({ message });
};

const responseBadRequestMessage = (response: Response, messages: string[]) => {
  response.status(400).json({ messages });
};

export const processError = (response: Response, ex: Error) => {
  const { message } = ex;

  if (ex instanceof NotFoundError) {
    responseNotFoundMessage(response, message);
  } else if (ex instanceof ValidationError) {
    responseBadRequestMessage(response, ex.errors);
  } else {
    response.status(404).json({ message });
  }
};

export default abstract class ApiController {
  private subPath: string;

  private router: Router;

  constructor(subPath: string) {
    this.subPath = subPath;
    this.router = Router();

    this.initialize();
  }

  initialize() {
    this.router.get(this.getPath(), this.findAll.bind(this));
    this.router.get(this.getPath(`:id(${uuidPatternRE})`), this.getById.bind(this));
    this.router.post(this.getPath(), this.create.bind(this));
    this.router.put(this.getPath(`:id(${uuidPatternRE})`), this.update.bind(this));
    this.router.delete(this.getPath(`:id(${uuidPatternRE})`), this.delete.bind(this));
  }

  protected getPath(path: string = '') {
    return createPath(this.subPath, path);
  }

  abstract getById(request: Request, response: Response): Promise<any>;

  abstract findAll(request: Request, response: Response): Promise<any>;

  abstract create(request: Request, response: Response): Promise<any>;

  abstract update(request: Request, response: Response): Promise<any>;

  abstract delete(request: Request, response: Response): Promise<any>;

  getRouter() {
    return this.router;
  }
}
