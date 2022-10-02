import MyBaseEntity from '~/api/_base/MyBaseEntity';

export default interface User extends MyBaseEntity {
  id: string;
  login: string;
  password?: string;
  age?: number;
}
