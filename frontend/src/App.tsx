import { useEffect, useState } from "react";
import { fetchTasks, addTask, completeTask } from "./api/tasks";
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

  return (
    <div className="todo-container">
      <div className="top-half">
        <h1 className="todo-title">To Do List</h1>
        <TaskList tasks={tasks} onToggle={handleComplete} />
      </div>
      <AddTaskForm onAdd={handleAdd} />
    </div>
  );
}

export default App;
