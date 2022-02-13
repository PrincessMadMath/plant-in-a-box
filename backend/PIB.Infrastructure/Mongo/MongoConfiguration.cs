using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PIB.Infrastructure.Mongo;

public static class MongoConfiguration
{
    public static IServiceCollection SetupMongo(this IServiceCollection services, ConfigurationManager config)
    {
        services.Configure<MongoSettings>(
            config.GetSection(MongoSettings.Mongo));

        services.AddSingleton<MongoRepository>();

        return services;
    }
}
