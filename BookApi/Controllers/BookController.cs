using Microsoft.AspNetCore.Mvc;
using BookApi.DTOs;
using BookApi.Services;
using BookApi.Utilities;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController(IBookService _bookService) : ControllerBase
{
    [HttpGet]
    [Route("")]
    public async Task<ActionResult<List<BookAuthorDto>>> GetAllBooks()
    {
        var bookDtos = await _bookService.GetAllBooksWithAuthor();
        return Ok(bookDtos);
    }

    [HttpPut]
    [Route("{bookId:int}")]
    public async Task<ActionResult<BookAuthorDto>> UpdateBook(
        [FromRoute] int bookId,
        [FromBody] BookAuthorDto updatedDto)
    {
        if (bookId != updatedDto.BookId)
        {
            throw new ApiException("Route param and body id of book do not match", StatusCodes.Status400BadRequest);
        }

        var dto = await _bookService.UpdateBookAuthor(updatedDto);

        return Ok(dto);

    }

    [HttpDelete]
    [Route("{bookId:int}")]
    public async Task<ActionResult> DeleteBook([FromRoute] int bookId)
    {
        await _bookService.DeleteBook(bookId);
        return NoContent();
    }
}
