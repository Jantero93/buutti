using BookApi.DTOs;

namespace BookApi.Services;

public interface IBookService
{
    Task<List<BookAuthorDto>> GetAllBooksWithAuthor();
}
