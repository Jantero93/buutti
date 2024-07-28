namespace BookApi.DTOs;

public record BookAuthorDto
{
    public int BookId { get; set; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required string AuthorName { get; init; }
    public int AuthorId { get; set; }
}
