using Microsoft.AspNetCore.Mvc;
using BookApi.DTOs;
using BookApi.Services;
using BookApi.Utilities;
using System.Net.Mime;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class BookController(IBookService _bookService, ILogger<BookController> _logger) : ControllerBase
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
            _logger.LogWarning(
                "Mismatch between book body id ({BodyId}) and route id ({RouteId})",
                updatedDto.BookId, bookId
            );
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

    [HttpPost]
    [Route("")]
    public async Task<ActionResult<BookAuthorDto>> CreateBook([FromBody] BookAuthorDto body)
    {
        var dto = await _bookService.CreateBook(body);
        return Ok(dto);
    }
}
