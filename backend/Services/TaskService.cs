using backend.Models;

namespace backend.Services
{
    public class TaskService
    {
        private readonly List<TaskItem> _tasks = new();
        private int _nextId = 1;

        public List<TaskItem> GetAll() => _tasks;

        public TaskItem Add(string title)
        {
            var task = new TaskItem { Id = _nextId++, Title = title, IsCompleted = false };
            _tasks.Add(task);
            return task;
        }

        public TaskItem? MarkComplete(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return null;

            task.IsCompleted = !task.IsCompleted;
            return task;
        }
    }
}
