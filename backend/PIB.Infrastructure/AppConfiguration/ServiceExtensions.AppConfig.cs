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

        config.AddAzureAppConfiguration(
            options => options.Connect(appConfigSettings.ConnectionString).UseFeatureFlags());

        services.AddAzureAppConfiguration();

        return services;
    }

    public static WebApplication UseAppConfig(this WebApplication app)
    {
        app.UseAzureAppConfiguration();

        return app;
    }
}
