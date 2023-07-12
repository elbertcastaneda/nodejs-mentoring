import MyBaseEntity from '~/api/_base/my-base-entity';

export enum Permissions {
  Read = 'READ',
  Write = 'WRITE',
  Delete = 'DELETE',
  Share = 'SHARE',
  UploadFiles = 'UPLOAD_FILES',
}

export default interface Group extends MyBaseEntity {
  name: string;
  permissions: Permissions[];
}
