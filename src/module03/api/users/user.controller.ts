import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiController from '~/api/_base/api-controller';
import FindAllDto from './dtos/findAll.dto';
import type UserService from './user.service';
import User from './user.entity';

export default class UsersController extends ApiController<UserService> {
  static create(service: UserService) {
    return new UsersController(service);
  }

  constructor(service: UserService) {
    super('users', service);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const user = await this.service.findById(id);

    response.status(StatusCodes.OK).json(user);
  }

  async getAll({ query }: Request, response: Response) {
    const filters: FindAllDto = query;
    const users = await this.service.findAll(filters);

    return response.status(StatusCodes.OK).json(users);
  }

  async add(request: Request, response: Response) {
    const user = await this.service.save(request.body, request.user as User);

    response.status(StatusCodes.CREATED).json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await this.service.update(id, request.body, request.user as User);

    response.sendStatus(StatusCodes.NO_CONTENT);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await this.service.delete(id, request.user as User);

    response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
