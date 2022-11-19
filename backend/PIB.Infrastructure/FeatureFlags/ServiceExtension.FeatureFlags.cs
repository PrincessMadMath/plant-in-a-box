using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.FeatureManagement;

namespace PIB.Infrastructure.FeatureFlags;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAndConfigureFeatureFlags(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddFeatureManagement();

        return services;
    }
}
