using BookApi.DTOs;
using BookApi.Models;

namespace BookApi.Mappers;

public interface IBookMapper
{
    BookAuthorDto MapBookToBookAuthorDto(Book b);
}
