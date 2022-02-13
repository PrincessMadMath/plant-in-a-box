using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PIB.Infrastructure.MediatR;
using PIB.Infrastructure.Mongo;

namespace PIB.Infrastructure;

public static class InfrastructureRegistration
{
    public static IServiceCollection SetupInfrastructure(this IServiceCollection services, ConfigurationManager config)
    {
        services.SetupMongo(config);
        services.SetupMediatR(config);

        return services;
    }
}
