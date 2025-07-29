import { useEffect, useState } from "react";
import { fetchTasks, addTask, completeTask } from "./api/tasks";

export interface TaskItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [inputError, setInputError] = useState(false)

  useEffect(() => {
    fetchTasks()
    .then(data => setTasks(data));
  }, []);

  const handleAdd = async () => {
    // error handling for empty task
    if (!newTitle.trim()) {
      setInputError(true);
      return;
    };

    // add valid input to task list, reset states
    const task = await addTask(newTitle);
    setTasks([...tasks, task]);
    setNewTitle("");
    setInputError(false);
  };

  const handleComplete = async (id: number) => {
    const updated = await completeTask(id);
    setTasks(tasks.map(t => t.id === id ? updated : t));
  };
  
  

  return (
    <div>
      <h1>Task List</h1>
      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="New task"
        style={{backgroundColor: inputError ? "red" : ''}}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {tasks?.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
              {task.title}
            </span>
            {!task.isCompleted ? (
              <button onClick={() => handleComplete(task.id)}>Complete</button>
            ) : <button onClick={() => handleComplete(task.id)}>Undo</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
