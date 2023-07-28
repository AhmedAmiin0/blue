import { ITask } from "@/interfaces/ITask";

export const getAllTasksRequest = (query: string = '') => ({
  method: "get",
  url: "/tasks?" + query,
});
export const getTaskRequest = (id: Pick<ITask, 'id'>) => ({
  method: "get",
  url: `/tasks/${id}`,
});
export const createTaskRequest = (task: ITask) => ({
  method: "post",
  url: "/tasks",
  data: task,
});
export const updateTaskRequest = (id: Pick<ITask, 'id'>, tasks: ITask) => ({
  method: "POST",
  url: `/tasks/${id}`,
  data: tasks,
});
export const deleteTaskRequest = (id: Pick<ITask, 'id'>) => ({
  method: "delete",
  url: `/tasks/${id}`,
});



