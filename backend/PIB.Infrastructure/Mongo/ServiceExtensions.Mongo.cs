using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;

namespace PIB.Infrastructure.Mongo;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAndConfigureMongoDB(this IServiceCollection services, ConfigurationManager config)
    {
        services.Configure<MongoSettings>(
            config.GetSection(MongoSettings.Mongo));

        services.AddSingleton<MongoRepository>();

        return services;
    }
    
    public static IServiceCollection AddMongoIndexes<T>(this IServiceCollection services) where T : MongoIndexBuilder<MongoDocument>
    {
        services.AddSingleton<MongoIndexBuilder<MongoDocument>>(x => Activator.CreateInstance<T>());

        return services;
    }
}
