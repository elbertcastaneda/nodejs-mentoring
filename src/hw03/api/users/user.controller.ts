import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiController from 'api/_base/apiController';
import FindAllDto from './dtos/findAll.dto';
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

    const user = await this.repository.getById(id);

    response.status(StatusCodes.OK).json(user);
  }

  async getAll({ query }: Request, response: Response) {
    const filters: FindAllDto = query;
    const users = await this.repository.findAll(filters);

    return response.status(StatusCodes.OK).json(users);
  }

  async add(request: Request, response: Response) {
    const user = await this.repository.save(request.body);

    response.status(StatusCodes.CREATED).json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await this.repository.update(id, request.body);

    response.sendStatus(StatusCodes.NO_CONTENT);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await this.repository.delete(id);

    response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
