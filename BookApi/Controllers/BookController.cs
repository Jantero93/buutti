using BookApi.DTOs;
using BookApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController(IBookService _bookService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<BookAuthorDto>>> GetAllBooks()
    {
        var bookDtos = await _bookService.GetAllBooksWithAuthor();
        return Ok(bookDtos);
    }

}
