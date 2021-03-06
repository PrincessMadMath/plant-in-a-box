using Api.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Setup
{
    /// <summary>
    /// Base on this documentation: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-5.0
    /// Using secret: https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows
    /// </summary>
    public static class ServiceExtensions
    {
        public static IServiceCollection ConfigureCors(this IServiceCollection services)
        {
            services.AddCors();

            return services;
        }
        
        public static IServiceCollection  AddConfig(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<MongoSettings>(
                config.GetSection("MongoConnection"));

            return services;
        }
    }
}