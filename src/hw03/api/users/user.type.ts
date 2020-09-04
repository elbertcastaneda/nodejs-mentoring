export default interface User {
  id: string;
  login: string;
  password?: string;
  age?: number;
  isDeleted: boolean;
}
