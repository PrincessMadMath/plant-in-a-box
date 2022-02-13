using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PIB.Infrastructure.MediatR;

public static class MediatRConfiguration
{
    public static IServiceCollection SetupMediatR(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());

        return services;
    }
}
