import MyBaseEntity from '~/api/_base/my-base-entity';

export default interface User extends MyBaseEntity {
  login: string;

  password?: string;

  age?: number;
}
