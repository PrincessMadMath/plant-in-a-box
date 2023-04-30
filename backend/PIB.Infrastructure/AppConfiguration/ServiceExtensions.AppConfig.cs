using Azure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PIB.Infrastructure.BlobStorage;

namespace PIB.Infrastructure.AppConfiguration;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAndConfigureAppConfig(this IServiceCollection services, ConfigurationManager config)
    {
        var appConfigSettings = config.GetSection(AppConfigSettings.AppConfig).Get<AppConfigSettings>();
        
        Console.WriteLine(appConfigSettings.Endpoint);

        // Why am I forbidden :( 
        config.AddAzureAppConfiguration(
            options => options.Connect(new Uri(appConfigSettings.Endpoint), new DefaultAzureCredential(new DefaultAzureCredentialOptions(){ManagedIdentityClientId = "e4a64d9e-9ed8-47b5-ba26-1812dc06fdb2" } )).UseFeatureFlags());
        
        services.AddAzureAppConfiguration();

        return services;
    }

    public static WebApplication UseAppConfig(this WebApplication app)
    {
        app.UseAzureAppConfiguration();

        return app;
    }
}
