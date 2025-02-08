export interface IUser {
  id: number;
  email?: string;
  first_name?: string;
  last_nmae?: string;
  username: string;
}

export interface IUserForm extends IUser {
  password: string;
}
