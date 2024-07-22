using BookApi.DTOs;
using BookApi.Models;

namespace BookApi.Mappers;

public class BookMapper : IBookMapper
{
    public BookAuthorDto MapBookToBookAuthorDto(Book b) =>
        new()
        {
            BookId = b.Id,
            Title = b.Title,
            Description = b.Description,
            AuthorId = b.Author.Id,
            AuthorName = b.Author.Name
        };
}
