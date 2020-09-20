import { Request, Response } from 'express';

import ApiController from 'api/_base/apiController';
import { processApiError } from 'api/_utils';
import { GroupRepository } from './group.repository';

export default class GroupsController extends ApiController {
  private repository: GroupRepository;

  static create(repository: GroupRepository) {
    return new GroupsController(repository);
  }

  constructor(repository: GroupRepository) {
    super('groups');

    this.repository = repository;

    this.createMethod({ method: 'get', path: ':uuid/users' }, this.getUsers);
    this.createMethod({ method: 'post', path: ':uuid/users' }, this.addUsers);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const group = await this.repository.getById(id);

      response.json(group);
    } catch (ex) {
      processApiError(response, ex);
    }
  }

  async getAll(request: Request, response: Response) {
    const groups = await this.repository.findAll();

    response.json(groups);
  }

  async add(request: Request, response: Response) {
    try {
      const group = await this.repository.save(request.body);

      response.status(201).json(group);
    } catch (ex) {
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

  async getUsers(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const group = await this.repository.getById(id);

      response.status(201).json(group.users);
    } catch (ex) {
      processApiError(response, ex);
    }
  }

  async addUsers(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { userIds } = request.body;
      const group = await this.repository.addUsers(id, userIds);

      response.status(201).json(group);
    } catch (ex) {
      processApiError(response, ex);
    }
  }
}
