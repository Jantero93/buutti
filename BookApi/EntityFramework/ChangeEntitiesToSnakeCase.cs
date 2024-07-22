using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using Npgsql.NameTranslation;

namespace BookApi.EntityFramework;

public static class ChangeEntitiesToSnakeCase
{
    public static void EntitiesToSnakeCase(this ModelBuilder builder)
    {
        var mapper = new NpgsqlSnakeCaseNameTranslator();
        foreach (var entity in builder.Model.GetEntityTypes())
        {
            foreach (var property in entity.GetProperties())
            {
                var storeObjectIdentifier = StoreObjectIdentifier.Create(property.DeclaringEntityType, StoreObjectType.Table);
                if (storeObjectIdentifier.HasValue)
                {
                    property.SetColumnName(mapper.TranslateMemberName(property.GetColumnName(storeObjectIdentifier.Value)));
                }
            }

            entity.SetTableName(mapper.TranslateTypeName(entity.GetTableName()));
        }
    }
}
