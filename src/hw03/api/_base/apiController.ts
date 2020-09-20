import { Request, Response, Router } from 'express';

const uuidPatternRE = '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
const prefixApi = '/api';
const createPath = (prefixPath: string, path = '') => `${prefixApi}/${prefixPath}/${path}`;

type RestMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';
type CallbackRestMethod = (request: Request, response: Response) => Promise<any>;
type CreateMethodOptions = { method: RestMethods, path: string };

export default abstract class ApiController {
  private subPath: string;

  private router: Router;

  constructor(subPath: string) {
    this.subPath = subPath;
    this.router = Router();

    this.initialize();
  }

  initialize() {
    this.router.get(this.getPath(), this.getAll.bind(this));
    this.router.get(this.getPath(`:id(${uuidPatternRE})`), this.getById.bind(this));
    this.router.post(this.getPath(), this.add.bind(this));
    this.router.put(this.getPath(`:id(${uuidPatternRE})`), this.update.bind(this));
    this.router.delete(this.getPath(`:id(${uuidPatternRE})`), this.delete.bind(this));
  }

  protected createMethod({ method, path }: CreateMethodOptions, callback: CallbackRestMethod) {
    const path2Work = path.replace(':uuid', `:id(${uuidPatternRE})`);

    this.router[method](this.getPath(path2Work), callback.bind(this));
  }

  protected getPath(path: string = '') {
    return createPath(this.subPath, path);
  }

  abstract getById(request: Request, response: Response): Promise<any>;

  abstract getAll(request: Request, response: Response): Promise<any>;

  abstract add(request: Request, response: Response): Promise<any>;

  abstract update(request: Request, response: Response): Promise<any>;

  abstract delete(request: Request, response: Response): Promise<any>;

  getRouter() {
    return this.router;
  }
}
