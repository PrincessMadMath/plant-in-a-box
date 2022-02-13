using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PIB.Infrastructure.MediatR;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAndConfigureMediatR(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());

        return services;
    }
}
