using BookApi.Utilities;
using System.Net.Mime;

namespace BookApi.Middlewares;

public class ExceptionHandlingMiddleware(RequestDelegate _next, ILogger<ExceptionHandlingMiddleware> _logger)
{
    public async Task InvokeAsync(HttpContext ctx)
    {
        try
        {
            await _next(ctx);
        }
        catch (ApiException e)
        {
            _logger.LogError(e, $"Exception handled by ExceptionHandlingMiddleware");
            await HandleApiExceptionAsync(ctx, e);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An unhandled exception has occurred.");
            await HandleExceptionAsync(ctx);
        }
    }

    private async static Task HandleApiExceptionAsync(HttpContext ctx, ApiException apiException)
    {
        ctx.Response.ContentType = MediaTypeNames.Application.Json;
        ctx.Response.StatusCode = apiException.StatusCode;

        var response = new
        {
            Message = apiException.Message
        };

        await ctx.Response.WriteAsJsonAsync(response);
    }

    private async static Task HandleExceptionAsync(HttpContext context)
    {
        context.Response.ContentType = MediaTypeNames.Application.Json;
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = new
        {
            Message = "An unexpected error occurred."
        };

        await context.Response.WriteAsJsonAsync(response);
    }
}