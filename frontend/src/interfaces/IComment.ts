import { IBase } from "./IBase";

export interface IComment extends IBase {
  content:string
  user_id: number
  task_id: number
}