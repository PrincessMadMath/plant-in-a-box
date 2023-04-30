using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PIB.Domain.IoT.Actuators.GrowthLight;
using PIB.Domain.IoT.Sensors.SoilMoisture;
using PIB.Domain.Species;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain;

public static class DomainRegistration
{
    public static IServiceCollection AddAndConfigureDomain(this IServiceCollection services, ConfigurationManager config)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());
        
        services.AddSingleton<GrowthLightService>();
        services.AddSingleton<SoilMoistureService>();

        // services.AddMongoIndexes<SpeciesDocumentIndexBuilder>();

        return services;
    }
}
