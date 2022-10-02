import { Router } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';

import UserService from '~/api/users/user.service';
import getJwtConfig, { Keys } from '~/config/jwt.config';
import { UnauthorizedUserError } from '~/errors';

const createSecurityRouter = (keys: Keys) => {
  const securityRouter = Router();
  const strategy = new JwtStrategy(getJwtConfig(keys), (payload, next) => {
    const users = UserService.create();

    if (payload.sub) {
      users.findById(payload.sub).then(
        (user) => {
          if (user) {
            next(null, user);
          } else {
            next(null, false);
          }
        },
        () => {
          next(new UnauthorizedUserError('Unauthorized token'), false);
        }
      );
    } else {
      next(new UnauthorizedUserError('Unauthorized token'), false);
    }
  });

  passport.use(strategy);
  securityRouter.use(passport.initialize());

  return securityRouter;
};

export default createSecurityRouter;
