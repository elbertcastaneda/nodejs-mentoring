import { Request, Response } from 'express';

import ApiController, { processError } from 'api/_base/apiController';
import { GroupRepository } from './group.repository';

export default class GroupsController extends ApiController {
  private repository: GroupRepository;

  static create(repository: GroupRepository) {
    return new GroupsController(repository);
  }

  constructor(repository: GroupRepository) {
    super('groups');

    this.repository = repository;
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const group = await this.repository.getById(id);

      response.json(group);
    } catch (ex) {
      processError(response, ex);
    }
  }

  async findAll(request: Request, response: Response) {
    const groups = await this.repository.findAll();

    response.json(groups);
  }

  async create(request: Request, response: Response) {
    try {
      const group = await this.repository.save(request.body);

      response.status(201).json(group);
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
