import Task from "../Task/Task";
import "./TaskList.css";
import { type ITaskListProps } from "./TaskList.types";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: ITaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-list">
        <span>No tasks to display</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} onDelete={() => onDelete(task.id)} onEdit={onEdit} />
      ))}
    </div>
  );
}
