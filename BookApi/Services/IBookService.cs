using BookApi.DTOs;

namespace BookApi.Services;

public interface IBookService
{
    Task<BookAuthorDto> CreateBook(BookAuthorDto bookAuthorDto);
    Task<List<BookAuthorDto>> GetAllBooksWithAuthor();
    Task<BookAuthorDto> UpdateBookAuthor(BookAuthorDto bookAuthorDto);
    Task DeleteBook(int id);
}
