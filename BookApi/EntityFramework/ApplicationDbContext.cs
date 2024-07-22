using BookApi.EntityFramework;
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

    public DbSet<YourEntity> YourEntities { get; set; }
}

public class YourEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
}
