using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;

namespace PIB.Infrastructure.Mongo;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAndConfigureMongoDB(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddOptions<MongoSettings>()
            .BindConfiguration(MongoSettings.Mongo)
            .ValidateDataAnnotations();

        services.AddSingleton<MongoRepository>();

        return services;
    }
}
