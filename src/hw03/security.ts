import { Router } from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import createUserRepository from 'api/users/user.repository';
import { logger } from '_utils';
import jwtConfig from 'config/jwt.config';

const securityRouter = Router();

const JwtStrategy = passportJWT.Strategy;
const strategy = new JwtStrategy(jwtConfig, (payload, next) => {
  const users = createUserRepository();

  logger.debug(`Validating JWT payload: ${payload.sub}`);
  if (payload.sub) {
    logger.debug(`Validated JWT payload: ${payload.sub}`);
    users.getById(payload.sub)
      .then((user) => {
        logger.debug(`Validated JWT: user founded: ${user.id}`);
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      });
  } else {
    logger.error('Unauthorized token');
    next(null, false);
  }
});
passport.use(strategy);
securityRouter.use(passport.initialize());

export default securityRouter;
