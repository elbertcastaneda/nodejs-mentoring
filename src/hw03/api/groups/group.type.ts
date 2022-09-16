import MyBaseEntity from 'api/_base/MyBaseEntity';

export enum Permissions {
  Read = 'READ',
  Write = 'WRITE',
  Delete = 'DELETE',
  Share = 'SHARE',
  UploadFiles = 'UPLOAD_FILES',
}

export default interface Group extends MyBaseEntity {
  id: string;
  name: string;
  permissions: Permissions[];
}
