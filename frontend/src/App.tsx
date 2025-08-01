import { useEffect, useState } from "react";
import { fetchTasks, addTask, completeTask, deleteTask, updateTask } from "./api/tasks";
import "./App.css";

import TaskList from "./components/TaskList/TaskList";
import AddTaskForm from "./components/InputTask/InputTask";
import type { ITaskItem } from "./components/Task/Task.types";

function App() {
  const [tasks, setTasks] = useState<ITaskItem[]>([]);

  useEffect(() => {
    fetchTasks()
    .then(data => setTasks(data));
  }, []);

  const handleAdd = async (title: string) => {
    const task = await addTask(title);
    setTasks(previousState => [...previousState, task]);
  };

  const handleComplete = async (id: number) => {
    const updatedTask = await completeTask(id);
    setTasks(previousState => previousState.map((task) => (task.id === id ? updatedTask : task)));
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEdit = async (id: number, title: string) => {
    try {
      const updated = await updateTask(id, title);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task))
      );
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  };

  return (
    <div className="todo-container">
      <div className="top-half">
        <h1 className="todo-title">To Do List</h1>
        <TaskList tasks={tasks} onToggle={handleComplete} onDelete={handleDelete} onEdit={handleEdit}/>
      </div>
      <AddTaskForm onAdd={handleAdd} />
    </div>
  );
}

export default App;
