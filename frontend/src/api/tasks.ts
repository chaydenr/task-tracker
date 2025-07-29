import type { TaskItem } from "../App";

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
  return res.json();
}

export async function completeTask(id: number): Promise<TaskItem> {
  const res = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Failed to complete task");
  }

  return await res.json();
}
