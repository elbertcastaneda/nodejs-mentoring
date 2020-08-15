import { User } from 'api/users/user.model';

const users = (new Map()) as Map<string, User>;

export default users;
