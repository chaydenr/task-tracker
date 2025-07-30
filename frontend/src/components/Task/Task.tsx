import React from "react";
import "./Task.css"
import { type ITaskProps } from './Task.types';

export default function Task ({ task, onToggle }: ITaskProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Prevent double toggling when checkbox is clicked
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    onToggle(task.id);
  };

  return (
    <div
      className={`task ${task.isCompleted ? "completed" : ""}`}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        onClick={(e) => e.stopPropagation()} // Prevent bubble to parent
      />
      <span>{task.title}</span>
    </div>
  );
};

