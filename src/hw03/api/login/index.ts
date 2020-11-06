import { Router, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import jwtConfig from 'config/jwt.config';
import createUserRepository from 'api/users/user.repository';
import { createPath } from 'api/_base/apiController';
import { convertValidate } from '_utils';
import LoginDto from './dtos/login.dto';

const login = Router();

login.post(createPath('login'), async ({ body }, response, next: NextFunction) => {
  try {
    const { username, password, rememberMe } = await convertValidate(LoginDto, body);
    const usersRepository = createUserRepository();
    const user = await usersRepository.getByLogin(username);

    if (user && user.password === password) {
      const now = moment();
      const issuerHost = process.env.WEBSERVER_VIRTUAL_HOST || 'localhost';
      const issuerPort = process.env.WEBSERVER_PORT || 5000;
      const payload = {
        sub: user.id,
        iss: `${issuerHost}:${issuerPort}`,
        iat: now.unix(),
        nbf: now.unix(),
        exp: rememberMe ? now.add(1, 'month').unix() : now.add(8, 'hour').unix(),
      };
      const token = jwt.sign(payload, jwtConfig.privateKeyContent, jwtConfig.signOptions);

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
