using Business.Services;
using Data.GroundHumidity;
using Data.GroundHumidity.MongoImpl;
using Microsoft.Extensions.DependencyInjection;

namespace Root
{
    public static class CompositionRoot
    {
        public static IServiceCollection InjectDependencies(this IServiceCollection services)
        {
            // Transient: Create each time
            services.AddTransient<IGroundHumidityRepository, GroundHumidityRepository>();
            services.AddTransient<IGroundHumidityService, GroundHumidityService>();

            return services;
        }
    }
}
