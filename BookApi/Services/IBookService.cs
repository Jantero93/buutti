using BookApi.DTOs;

namespace BookApi.Services;

public interface IBookService
{
    Task<List<BookAuthorDto>> GetAllBooksWithAuthor();
    Task<BookAuthorDto> UpdateBookAuthor(BookAuthorDto bookAuthor);
    Task DeleteBook(int id);
}
