export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export const TaskStatusValues: { [key in TaskStatus]: TaskStatus } = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}
