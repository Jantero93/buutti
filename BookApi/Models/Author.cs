using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BookApi.Models;

[Index(nameof(Name), IsUnique = true)]
public record Author
{
    public int Id { get; set; }

    [MaxLength(255)]
    public required string Name { get; set; }

    // Navigation property
    public ICollection<Book> Books { get; set; } = [];
}
