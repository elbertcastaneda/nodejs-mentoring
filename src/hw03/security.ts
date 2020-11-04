import { Router } from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
// import { users, configurationOptions } from 'sbxngine-model-repositories';
// import { logger } from '_utils';
import jwtConfig from 'config/jwt.config';

const securityRouter = Router();

const JwtStrategy = passportJWT.Strategy;
const strategy = new JwtStrategy(jwtConfig, (payload, next) => {
  // if (payload.sub) {
  //   users.hasNgineAccess(Number(payload.sub.decrypt()))
  //     .then((user) => {
  //       if (user) {
  //         next(null, user);
  //       } else {
  //         next(null, false);
  //       }
  //     });
  // } else {
  //   logger.error('unauthorized old token');
  //   next(null, false);
  // }
  next(null, {});
});
passport.use(strategy);
securityRouter.use(passport.initialize());

export default securityRouter;
