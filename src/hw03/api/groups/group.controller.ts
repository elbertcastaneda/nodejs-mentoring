import { Request, Response } from 'express';

import ApiController from 'api/_base/apiController';
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

    const group = await this.repository.getById(id);

    response.json(group);
  }

  async getAll(request: Request, response: Response) {
    const groups = await this.repository.findAll();

    response.json(groups);
  }

  async add(request: Request, response: Response) {
    const group = await this.repository.save(request.body);

    response.status(201).json(group);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await this.repository.update(id, request.body);

    response.sendStatus(204);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    this.repository.delete(id);

    response.sendStatus(204);
  }

  async getUsers(request: Request, response: Response) {
    const { id } = request.params;
    const group = await this.repository.getById(id);

    response.status(201).json(group.users);
  }

  async addUsers(request: Request, response: Response) {
    const { id } = request.params;
    const { userIds } = request.body;
    const group = await this.repository.addUsers(id, userIds);

    response.status(201).json(group);
  }
}
