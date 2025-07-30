import { type ITaskItem } from "../Task/Task.types";

export interface ITaskListProps {
  tasks: ITaskItem[];
  onToggle: (id: number) => void;
}