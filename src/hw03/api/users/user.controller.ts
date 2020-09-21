import { Request, Response } from 'express';

import ApiController from 'api/_base/apiController';
import { processApiError } from 'api/_utils';
import FindAllDto from './dtos/findAllDto';
import { UserRepository } from './user.repository';

export default class UsersController extends ApiController {
  private repository: UserRepository;

  static create(repository: UserRepository) {
    return new UsersController(repository);
  }

  constructor(repository: UserRepository) {
    super('users');

    this.repository = repository;
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await this.repository.getById(id);

      response.json(user);
    } catch (ex) {
      processApiError(response, ex);
    }
  }

  async getAll({ query }: Request, response: Response) {
    const filters: FindAllDto = query;
    const users = await this.repository.findAll(filters);

    response.json(users);
  }

  async add(request: Request, response: Response) {
    try {
      const user = await this.repository.save(request.body);

      response.status(201).json(user);
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(ex), 'error');
      processApiError(response, ex);
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await this.repository.update(id, request.body);

      response.sendStatus(204);
    } catch (ex) {
      processApiError(response, ex);
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      this.repository.delete(id);

      response.sendStatus(204);
    } catch (ex) {
      processApiError(response, ex);
    }
  }
}
