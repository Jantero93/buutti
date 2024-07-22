using BookApi.DTOs;
using BookApi.Mappers;
using Microsoft.EntityFrameworkCore;
using YourNamespace;

namespace BookApi.Services
{
    public class BookService(ApplicationDbContext _context, IBookMapper _mapper) : IBookService
    {

        public async Task<List<BookAuthorDto>> GetAllBooksWithAuthor()
        {
            var booksList = await _context.Books
                .AsNoTracking()
                .Include(x => x.Author)
                .ToListAsync();

            var bookDtos = booksList.Select(_mapper.MapBookToBookAuthorDto).ToList();

            return bookDtos;
        }
    }
}
