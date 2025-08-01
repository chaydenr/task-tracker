export interface ITaskItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface ITaskProps {
  task: ITaskItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}