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

    public async Task<BookAuthorDto> UpdateBookAuthor(BookAuthorDto bookAuthorDto)
    {
        _logger.LogInformation("Starting to update book with id {Id}", bookAuthorDto.BookId);

        var bookEntity = await _context.Books
            .Include(b => b.Author)
            .FirstOrDefaultAsync(x => x.Id == bookAuthorDto.BookId);

        if (bookEntity is null)
        {
            _logger.LogWarning("Not found book by id: {Id}", bookAuthorDto.BookId);
            throw new ApiException($"Book with id {bookAuthorDto.BookId} not found", StatusCodes.Status404NotFound);
        }

        if (bookEntity.Author.Name != bookAuthorDto.AuthorName &&
            !string.IsNullOrWhiteSpace(bookAuthorDto.AuthorName))
        {
            // Try to find author from db, if doesn't exists add new
            var existingAuthor = await _context.Author
                .FirstOrDefaultAsync(a => a.Name == bookAuthorDto.AuthorName);

            if (existingAuthor is not null)
            {
                bookEntity.Author = existingAuthor;
            }
            else
            {
                var newAuthor = new Author { Name = bookAuthorDto.AuthorName };
                bookEntity.Author = newAuthor;
                _context.Author.Add(newAuthor);

                _logger.LogInformation("Created new author with id: {Id}", newAuthor.Id);
            }
        }

        bookEntity.Title = bookAuthorDto.Title ?? bookEntity.Title;
        bookEntity.Description = bookAuthorDto.Description ?? bookEntity.Description;

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

    public async Task<BookAuthorDto> CreateBook(BookAuthorDto bookAuthorDto)
    {
        _logger.LogInformation("Starting to create book with title {Title}", bookAuthorDto.Title);

        var existingBook = await _context.Books
            .FirstOrDefaultAsync(x => x.Title == bookAuthorDto.Title);

        if (existingBook is not null)
        {
            _logger.LogWarning("Book with title {Title} already exists", bookAuthorDto.Title);
            throw new ApiException($"Book with title {bookAuthorDto.Title} already exists", StatusCodes.Status409Conflict);
        }

        var authorEntity = await _context.Author
            .FirstOrDefaultAsync(a => a.Name == bookAuthorDto.AuthorName);

        if (authorEntity is null)
        {
            authorEntity = new Author { Name = bookAuthorDto.AuthorName };
            _context.Author.Add(authorEntity);
            _logger.LogInformation("Created new author with name {Name}", authorEntity.Name);
        }

        var bookEntity = new Book
        {
            Title = bookAuthorDto.Title,
            Description = bookAuthorDto.Description,
            Author = authorEntity
        };

        _context.Books.Add(bookEntity);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Created book with id {Id}", bookEntity.Id);

        return _mapper.MapBookToBookAuthorDto(bookEntity);
    }
}
