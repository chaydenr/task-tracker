import { type ITaskItem } from "../Task/Task.types";

export interface ITaskListProps {
  tasks: ITaskItem[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}