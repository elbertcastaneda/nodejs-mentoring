import { UnauthorizedUserError } from 'errors';
import { Request, Response, Router, NextFunction } from 'express';
import passport from 'passport';
import { logger } from '_utils';

const uuidPatternRE = '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
const PREFIX_PATH = '/api';
export const createPath = (prefixPath: string, path = '') => `${PREFIX_PATH}/${prefixPath}/${path}`;

type RestMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';
type CallbackRestMethod = (request: Request, response: Response, next?: Function) => Promise<any>;
type CreateMethodOptions = { method: RestMethods; path?: string };

function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      logger.error(info.message);

      throw new UnauthorizedUserError();
    }

    req.user = user;
    next();
  })(req, res, next);
}

export default abstract class ApiController {
  private subPath: string;

  private router: Router;

  constructor(subPath: string) {
    this.subPath = subPath;
    this.router = Router();

    this.initialize();
  }

  initialize() {
    this.createMethod({ method: 'get' }, this.getAll);
    this.createMethod({ method: 'get', path: ':uuid' }, this.getById);
    this.createMethod({ method: 'post' }, this.add);
    this.createMethod({ method: 'put', path: ':uuid' }, this.update);
    this.createMethod({ method: 'delete', path: ':uuid' }, this.delete);
  }

  protected createMethod({ method, path = '' }: CreateMethodOptions, callback: CallbackRestMethod) {
    const path2Work = path.replace(':uuid', `:id(${uuidPatternRE})`);

    this.router[method](
      this.getPath(path2Work),
      authenticateJwt,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await callback.bind(this)(req, res, next);
        } catch (err) {
          if (err instanceof Error) {
            logger.error(
              `method: ${req.path}(${req.method}), query: ${JSON.stringify(
                req.query
              )}, body: ${JSON.stringify(req.body)}, error: ${err.message}`
            );
          } else {
            logger.error(
              `method: ${req.path}(${req.method}), query: ${JSON.stringify(
                req.query
              )}, body: ${JSON.stringify(req.body)}, error: ${err}`
            );
          }
          next(err);
        }
      }
    );
  }

  protected getPath(path: string = '') {
    return createPath(this.subPath, path);
  }

  abstract getById(request: Request, response: Response, next?: Function): Promise<any>;

  abstract getAll(request: Request, response: Response, next?: Function): Promise<any>;

  abstract add(request: Request, response: Response, next?: Function): Promise<any>;

  abstract update(request: Request, response: Response, next?: Function): Promise<any>;

  abstract delete(request: Request, response: Response, next?: Function): Promise<any>;

  getRouter() {
    return this.router;
  }
}
