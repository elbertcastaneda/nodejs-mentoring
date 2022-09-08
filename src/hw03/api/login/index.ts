import { Router, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import moment from 'moment';

import jwtConfig from 'config/jwt.config';
import UserService from 'api/users/user.service';
import { createPath } from 'api/_base/apiController';
import { validate } from 'class-validator';
import { processValidationErrors } from '_utils';

import LoginDto from './dtos/login.dto';

const login = Router();

login.post(createPath('login'), async ({ body }, response, next: NextFunction) => {
  try {
    const loginData = Object.assign(new LoginDto(), body) as LoginDto;
    const validationErrors = await validate(loginData);

    processValidationErrors(validationErrors);

    const { username, password, rememberMe } = loginData;
    const userService = UserService.create();
    const user = await userService.getByLogin(username);

    if (user && user.password === password) {
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
      const token = sign(payload, jwtConfig.privateKeyContent, jwtConfig.signOptions);

      response.status(StatusCodes.OK).json({ token });
    } else {
      response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
    }
  } catch (error) {
    next(error);
  }
});

const createLoginModule = () => login;

export default createLoginModule;
