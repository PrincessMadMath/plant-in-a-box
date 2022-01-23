using Domain.Actuators.GrowthLight;
using Domain.Actuators.Light;
using Domain.Sensors.SoilMoisture;

namespace PIB.Api.Setup;

public static class ServiceExtension
{
    // TODO: TEMPORARY
    // Check: https://stackoverflow.com/questions/35553500/xmlhttprequest-cannot-load-xxx-no-access-control-allow-origin-header
    // Check: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
    public static IServiceCollection ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(o => o.AddPolicy("AllowAll", builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        }));

        return services;
    }
    
    public static IServiceCollection InjectDomainDependencies(this IServiceCollection services)
    {
        // Transient: Create each time
        services.AddSingleton<GrowthLightService>();
        services.AddSingleton<SoilMoistureService>();

        return services;
    }
}