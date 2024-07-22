namespace BookApi.Models;

public record Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }

    // Navigation property
    public required Author Author { get; set; }
}
