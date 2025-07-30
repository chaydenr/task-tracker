# To-Do App

Hello! Welcome to my minimal and sleek to-do list application built with **React + TypeScript** for the frontend and a simple **C#** API for the backend.

## Getting Started

You'll need the **.NET 6+ SDK**, **Node.js v18** (or above), and **npm** installed.

---

### Backend Setup
Open a terminal and run the following commands
```bash
cd backend
dotnet run --urls "http://localhost:5234"
```

- Starts your backend server on [http://localhost:5234](http://localhost:5234)
- The API used for this application is located at [/tasks](http://localhost:5234/tasks)

### Frontend Setup
Open a new terminal and run the following commands
```bash
cd frontend
npm install
npm run dev
```

- Runs the app in development mode
- Open [http://localhost:5173/](http://localhost:5173/)

---

Once your backend and frontend are running simultaneously, you are all set to use the task manager. Here, you can add new tasks to your list, and mark them as completed when finished. 