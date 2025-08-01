namespace backend.Models
{
    // Given from project requirements
    public class TaskItem
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }
    }
}
