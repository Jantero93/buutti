using BookApi.EntityFramework;
using BookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace YourNamespace;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.EntitiesToSnakeCase();
    }

    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Author { get; set; }
}
