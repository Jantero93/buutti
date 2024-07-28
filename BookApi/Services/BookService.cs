using BookApi.DTOs;
using BookApi.EntityFramework;
using BookApi.Mappers;
using BookApi.Models;
using BookApi.Utilities;
using Microsoft.EntityFrameworkCore;

namespace BookApi.Services;

public class BookService(ApplicationDbContext _context, IBookMapper _mapper, ILogger<IBookService> _logger) : IBookService
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

        _logger.LogInformation("Fetched all books");

        return bookDtos;
    }

    public async Task<BookAuthorDto> UpdateBookAuthor(BookAuthorDto bookAuthor)
    {
        _logger.LogInformation("Starting to update book with id {Id}", bookAuthor.BookId);

        var bookEntity = await _context.Books
            .Include(b => b.Author)
            .FirstOrDefaultAsync(x => x.Id == bookAuthor.BookId);

        if (bookEntity is null)
        {
            _logger.LogWarning("Not found book by id: {Id}", bookAuthor.BookId);
            throw new ApiException($"Book with id {bookAuthor.BookId} not found", StatusCodes.Status404NotFound);
        }

        if (bookEntity.Author.Name != bookAuthor.AuthorName &&
            !string.IsNullOrWhiteSpace(bookAuthor.AuthorName))
        {
            // Try to find author from db, if doesn't exists add new
            var existingAuthor = await _context.Author
                .FirstOrDefaultAsync(a => a.Name == bookAuthor.AuthorName);

            if (existingAuthor is not null)
            {
                bookEntity.Author = existingAuthor;
            }
            else
            {
                var newAuthor = new Author { Name = bookAuthor.AuthorName };
                bookEntity.Author = newAuthor;
                _context.Author.Add(newAuthor);

                _logger.LogInformation("Created new author with id: {Id}", newAuthor.Id);
            }
        }

        bookEntity.Title = bookAuthor.Title ?? bookEntity.Title;
        bookEntity.Description = bookAuthor.Description ?? bookEntity.Description;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Updated successfully book with id {Id}", bookEntity.Id);
        return _mapper.MapBookToBookAuthorDto(bookEntity);
    }

    public async Task DeleteBook(int id)
    {
        var entityBook = await _context.Books
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entityBook is null)
        {
            _logger.LogWarning("Not found book by id: {Id} (delete)", id);
            throw new ApiException($"Not found by id {id}", StatusCodes.Status404NotFound);
        }

        _context.Remove(entityBook);
        await _context.SaveChangesAsync();
    }
}
