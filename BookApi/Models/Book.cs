using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BookApi.Models;

public record Book
{
    public int Id { get; set; }

    [MaxLength(255)]
    public required string Title { get; set; }

    [MaxLength(2087)]
    public required string Description { get; set; }

    // Navigation property
    public required Author Author { get; set; }
}
