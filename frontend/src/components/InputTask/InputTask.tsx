import { useState } from "react";
import "./InputTask.css";
import { type IAddTaskFormProps } from "./InputTask.types";

export default function AddTaskForm({ onAdd }: IAddTaskFormProps) {
  const [newTitle, setNewTitle] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleAdd = async () => {
    if (!newTitle.trim()) {
      setInputError(true);
      return;
    }
    await onAdd(newTitle);
    setNewTitle("");
    setInputError(false);
  };

  return (
    <div className="todo-input-group">
      <input
        className={`todo-input ${inputError ? "input-error" : ""}`}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder={inputError ? "Enter task title before submitting" : "New task"}
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />
      <button className="todo-button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
