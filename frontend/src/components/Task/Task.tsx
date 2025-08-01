import React, { useState } from "react";
import "./Task.css"
import { type ITaskProps } from './Task.types';

export default function Task ({ task, onToggle, onDelete, onEdit }: ITaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

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
      {isEditing ? (
        <input
          type="text"
          className="task-edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const trimmed = editTitle.trim();
              if (trimmed && trimmed !== task.title) {
                onEdit(task.id, trimmed);
              }
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <span
          className={`task-title ${task.isCompleted ? "completed" : ""}`}
          onClick={() => onToggle(task.id)}
        >
          {task.title}
        </span>
      )}

      <div className="task-buttons" onClick={(e) => e.stopPropagation()}>
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          ✎
        </button>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          ✕
        </button>
      </div>
    </div>
  );
};

