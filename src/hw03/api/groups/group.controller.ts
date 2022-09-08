import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type GroupService from 'api/groups/group.service';

import ApiController from 'api/_base/apiController';
export default class GroupsController extends ApiController {
  private service: GroupService;

  static create(service: GroupService) {
    return new GroupsController(service);
  }

  constructor(service: GroupService) {
    super('groups');

    this.service = service;

    this.createMethod({ method: 'get', path: ':uuid/users' }, this.getUsers);
    this.createMethod({ method: 'post', path: ':uuid/users' }, this.addUsers);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const group = await this.service.getById(id);

    response.status(StatusCodes.OK).json(group);
  }

  async getAll(request: Request, response: Response) {
    const groups = await this.service.findAll();

    response.status(StatusCodes.OK).json(groups);
  }

  async add(request: Request, response: Response) {
    const group = await this.service.save(request.body);

    response.status(StatusCodes.CREATED).json(group);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    await this.service.update(id, request.body);

    response.sendStatus(StatusCodes.NO_CONTENT);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await this.service.delete(id);

    response.sendStatus(StatusCodes.NO_CONTENT);
  }

  async getUsers(request: Request, response: Response) {
    const { id } = request.params;
    const group = await this.service.getById(id);

    response.status(StatusCodes.OK).json(group.users);
  }

  async addUsers(request: Request, response: Response) {
    const { id } = request.params;
    const { userIds } = request.body;
    const group = await this.service.addUsers(id, userIds);

    response.status(StatusCodes.CREATED).json(group);
  }
}
