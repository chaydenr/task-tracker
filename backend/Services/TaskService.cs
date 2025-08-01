using backend.Models;

namespace backend.Services
{
    // Service to manage task operations using in-memory storage
    public class TaskService
    {
        // In-memory storage list for tasks
        private readonly List<TaskItem> _tasks = new();
        private int _nextId = 1;

        // Get all tasks
        public List<TaskItem> GetAll() => _tasks;

        // Add a new task with a title
        // Returns the created TaskItem
        public TaskItem Add(string title)
        {
            var task = new TaskItem { Id = _nextId++, Title = title, IsCompleted = false };
            _tasks.Add(task);
            return task;
        }

        // Mark a task as complete or incomplete
        // Returns the updated task or null if not found
        public TaskItem? MarkComplete(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return null;

            task.IsCompleted = !task.IsCompleted;
            return task;
        }

        // Delete a task by ID
        // Returns true if deleted, false if not found
        public bool Delete(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return false;
            }

            _tasks.Remove(task);
            return true;
        }

        // Update a task's title by ID
        // Returns the updated TaskItem or null if not found
        public TaskItem? Update(int id, string newTitle)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return null;

            task.Title = newTitle;
            return task;
        }

    }
}
