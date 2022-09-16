import { Router, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { validate } from 'class-validator';
import moment from 'moment';

import getJwtConfig, { Keys } from 'config/jwt.config';
import UserService from 'api/users/user.service';
import { createPath } from 'api/_base/apiController';
import { processValidationErrors } from '_utils';
import { UnauthorizedUserError } from 'errors';

import LoginDto from './dtos/login.dto';

const createLoginModule = (keys: Keys) => {
  const login = Router();

  login.post(createPath('login'), async ({ body }, response, next: NextFunction) => {
    try {
      const loginData = Object.assign(new LoginDto(), body) as LoginDto;
      const validationErrors = await validate(loginData);

      processValidationErrors(validationErrors);

      const { username, password, rememberMe } = loginData;
      const userService = UserService.create();
      const user = await userService.findByLogin(username, true);

      if (user && user.comparePassword(password)) {
        const now = moment();
        const issuerHost = process.env.WEBSERVER_VIRTUAL_HOST || 'localhost';
        const issuerPort = process.env.WEBSERVER_PORT || 6000;
        const payload = {
          sub: user.id,
          iss: `${issuerHost}:${issuerPort}`,
          iat: now.unix(),
          nbf: now.unix(),
          exp: rememberMe ? now.add(1, 'month').unix() : now.add(8, 'hour').unix(),
        };

        const jwtConfig = getJwtConfig(keys);
        const token = sign(payload, jwtConfig.privateKeyContent, jwtConfig.signOptions);

        response.status(StatusCodes.OK).json({ token });
      } else {
        throw new UnauthorizedUserError();
      }
    } catch (error) {
      next(error);
    }
  });

  return login;
};

export default createLoginModule;
