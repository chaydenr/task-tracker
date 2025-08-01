using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("tasks")]
    public class TasksController : ControllerBase
    {
        // Use TaskService to handle task operations
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

        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            var deleted = _taskService.Delete(id);
            if (!deleted)
            {
                // If the task was not found, return 404
                return NotFound();
            }
            // No content to return, just a success status
            return NoContent();
        }
        
        [HttpPut("{id}")]
        public ActionResult<TaskItem> UpdateTask(int id, [FromBody] TitleUpdateRequest request)
        {
            var task = _taskService.Update(id, request.Title);
            if (task == null) return NotFound();

            return Ok(task);
        }

        public class TitleUpdateRequest
        {
            required public string Title { get; set; }
        }

    }
}
