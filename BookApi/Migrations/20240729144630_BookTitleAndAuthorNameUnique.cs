using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookApi.Migrations
{
    /// <inheritdoc />
    public partial class BookTitleAndAuthorNameUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_books_title",
                table: "books",
                column: "title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_author_name",
                table: "author",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_books_title",
                table: "books");

            migrationBuilder.DropIndex(
                name: "ix_author_name",
                table: "author");
        }
    }
}
