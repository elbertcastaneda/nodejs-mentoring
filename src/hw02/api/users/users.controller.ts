import { Request, Response, Router } from 'express';

import NotFoundError from 'errors/NotFoundError';
import UsersRepository from './users.repository';

const uuidPatternRE = '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
const prefixPath = '/api/users';
const getPath = (path = '') => `${prefixPath}/${path}`;

const responseNotFoundMessage = (response: Response, message: string) => {
  response.status(404).json({ message });
};

const processError = (response: Response, ex: Error) => {
  const { message } = ex;

  if (ex instanceof NotFoundError) {
    responseNotFoundMessage(response, message);
  } else {
    response.status(404).json({ message });
  }
};

export default class UsersController {
  private message: string;

  private repository: UsersRepository;

  private router: Router;

  static create(repository: UsersRepository) {
    return new UsersController(repository);
  }

  constructor(repository: UsersRepository) {
    this.message = 'Hello world';
    this.repository = repository;
    this.router = Router();

    this.initialize();
  }

  initialize() {
    this.router.get(getPath(`:userId(${uuidPatternRE})`), this.getById.bind(this));
    this.router.get(getPath('auto-suggest'), this.getAutoSuggest.bind(this));
    this.router.post(getPath(), this.create.bind(this));
    this.router.put(getPath(`:userId(${uuidPatternRE})`), this.update.bind(this));
    this.router.delete(getPath(`:userId(${uuidPatternRE})`), this.delete.bind(this));
  }

  getRouter() {
    return this.router;
  }

  private getById(request: Request, response: Response) {
    const { userId } = request.params;

    try {
      const user = this.repository.getById(userId);

      response.json(user);
    } catch (ex) {
      processError(response, ex);
    }
  }

  private getAutoSuggest(request: Request, response: Response) {
    response.json(this.repository.getAutoSuggest(request.query));
  }

  private create(request: Request, response: Response) {
    response.status(201).json(this.repository.create(request.body));
  }

  private update(request: Request, response: Response) {
    const { userId } = request.params;

    try {
      const user = this.repository.update(userId, request.body);

      response.json(user);
    } catch (ex) {
      processError(response, ex);
    }
  }

  private delete(request: Request, response: Response) {
    const { userId } = request.params;

    try {
      this.repository.delete(userId);

      response.sendStatus(204);
    } catch (ex) {
      processError(response, ex);
    }
  }
}
