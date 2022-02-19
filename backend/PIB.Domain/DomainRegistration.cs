﻿using System.Reflection;
using Domain.IoT.Actuators.GrowthLight;
using Domain.IoT.Sensors.SoilMoisture;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Domain;

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
