using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PIB.Domain.IoT.Actuators.GrowthLight;
using PIB.Domain.IoT.Sensors.SoilMoisture;

namespace PIB.Domain;

public static class DomainRegistration
{
    public static IServiceCollection AddAndConfigureDomain(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());
        
        // Transient: Create each time
        services.AddSingleton<GrowthLightService>();
        services.AddSingleton<SoilMoistureService>();

        return services;
    }
}
