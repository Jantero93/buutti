using BookApi.DTOs;
using BookApi.EntityFramework;
using BookApi.Mappers;
using BookApi.Utilities;
using Microsoft.EntityFrameworkCore;

namespace BookApi.Services;

public class BookService(ApplicationDbContext _context, IBookMapper _mapper) : IBookService
{
    public async Task<List<BookAuthorDto>> GetAllBooksWithAuthor()
    {
        var booksList = await _context.Books
            .AsNoTracking()
            .Include(x => x.Author)
            .ToListAsync();

        if (booksList is null)
        {
            return [];
        }

        var bookDtos = booksList.Select(_mapper.MapBookToBookAuthorDto).ToList();

        return bookDtos;
    }
}
