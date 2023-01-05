using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PIB.Infrastructure.BlobStorage;

namespace PIB.Infrastructure.AppConfiguration;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAndConfigureAppConfig(this IServiceCollection services, ConfigurationManager config)
    {
        // var appConfigSettings = config.GetSection(AppConfigSettings.AppConfig).Get<AppConfigSettings>();
        
        // Console.WriteLine(appConfigSettings.ConnectionString);

        config.AddAzureAppConfiguration(
            options => options.Connect("Endpoint=https://pib-configuration.azconfig.io;Id=QK8z-ll-s0:AP0jbdJM1yXZBZrPVlUe;Secret=lJCzoA9AUlbcstItmHe0DKYvryGCa0jxKMPf9FQ8zQg=").UseFeatureFlags());
        
        services.AddAzureAppConfiguration();

        return services;
    }

    public static WebApplication UseAppConfig(this WebApplication app)
    {
        app.UseAzureAppConfiguration();

        return app;
    }
}
