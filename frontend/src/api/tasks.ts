import { type ITaskItem } from "../components/Task/Task.types";

const BASE_URL = "http://localhost:5234/tasks";

export async function fetchTasks() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function addTask(title: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to add task");
  }
  
  return res.json();
}

export async function completeTask(id: number): Promise<ITaskItem> {
  const res = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Failed to complete task");
  }

  return await res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}
