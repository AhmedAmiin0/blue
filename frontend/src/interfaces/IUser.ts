import { IBase } from "./IBase";
import { IComment } from "./IComment";
import { ITask } from "./ITask";

export interface IUser extends IBase{
  name: string;
  email: string;
  email_verified_at: Date | null;
  password: string;
  remember_token: string | null;
  comments?:IComment[]
  tasks:ITask[]
}

export interface IUserLoginResponse {
  token: string;
  user: IUser;
}
export interface IUserRegisterResponse {
  token: string;
  user: IUser;
}

