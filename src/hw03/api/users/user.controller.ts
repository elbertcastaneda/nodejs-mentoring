import { Request, Response } from 'express';

import ApiController, { processError } from 'api/_base/apiController';
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
      processError(response, ex);
    }
  }

  async findAll({ query }: Request, response: Response) {
    const filters: FindAllDto = query;
    const users = await this.repository.findAll(filters);

    response.json(users);
  }

  async create(request: Request, response: Response) {
    try {
      const user = await this.repository.save(request.body);

      response.status(201).json(user);
    } catch (ex) {
      processError(response, ex);
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await this.repository.update(id, request.body);

      response.sendStatus(204);
    } catch (ex) {
      processError(response, ex);
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      this.repository.delete(id);

      response.sendStatus(204);
    } catch (ex) {
      processError(response, ex);
    }
  }
}