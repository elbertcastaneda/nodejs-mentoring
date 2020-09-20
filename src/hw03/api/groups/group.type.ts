export enum Permissions {
  Read = 'READ',
  Write = 'WRITE',
  Delete = 'DELETE',
  Share = 'SHARE',
  UploadFiles = 'UPLOAD_FILES',
}

export default interface Group {
  id: string;
  name: string;
  permissions: Permissions[];
}
