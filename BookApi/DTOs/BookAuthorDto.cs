namespace BookApi.DTOs;

public record BookAuthorDto
{
    public required int BookId { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required string AuthorName { get; init; }
    public required int AuthorId { get; init; }
}
