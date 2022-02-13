using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Domain;

public static class DomainRegistration
{
    public static IServiceCollection SetupDomain(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());

        return services;
    }
}
