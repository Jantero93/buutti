using BookApi.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;

namespace BookApi.Middlewares;

public class ExceptionHandlingMiddleware(RequestDelegate _next, ILogger<ExceptionHandlingMiddleware> _logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ApiException ex)
        {
            _logger.LogError(ex, "Exception handled by ExceptionHandlingMiddleware");
            await HandleExceptionAsync(context, ex.StatusCode, ex.Message);
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Error on interacting with the database");
            await HandleExceptionAsync(context, StatusCodes.Status400BadRequest, ex.InnerException?.Message ?? ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception has occurred.");
            await HandleExceptionAsync(context, StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, int statusCode, string message)
    {
        context.Response.ContentType = MediaTypeNames.Application.Json;
        context.Response.StatusCode = statusCode;

        var response = new
        {
            Message = message
        };

        await context.Response.WriteAsJsonAsync(response);
    }
}
