using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("tasks")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<List<TaskItem>> GetTasks()
        {
            return _taskService.GetAll();
        }

        [HttpPost]
        public ActionResult<TaskItem> AddTask([FromBody] TaskItem request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
                return BadRequest("Title is required");

            var newTask = _taskService.Add(request.Title);
            return CreatedAtAction(nameof(GetTasks), new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id}/complete")]
        public ActionResult<TaskItem> CompleteTask(int id)
        {
            var updatedTask = _taskService.MarkComplete(id);
            if (updatedTask == null) return NotFound();

            return Ok(updatedTask); // Return updated task for frontend
        }

    }
}
