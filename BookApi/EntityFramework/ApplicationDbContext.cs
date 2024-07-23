using BookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookApi.EntityFramework;
public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Author { get; set; }
}
