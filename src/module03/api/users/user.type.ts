import MyBaseEntity from '~/api/_base/MyBaseEntity';

export default interface User extends MyBaseEntity {
  login: string;

  password?: string;

  age?: number;
}
