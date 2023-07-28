
import { IBase } from './IBase';
import { IComment } from './IComment';
import { ITag } from './ITag';
export interface ITask extends IBase {
  title: string
  description: string
  user_id: number
  comments?: IComment[]
  tag_id: number | null
  tag?: ITag | null
  dueDate: Date | undefined 
  isCompleted: boolean
  

}