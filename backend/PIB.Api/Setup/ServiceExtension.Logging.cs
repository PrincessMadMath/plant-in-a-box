using Serilog;

namespace PIB.Api.Setup;

public static partial class ServiceCollectionExtensions
{
    public static ConfigureHostBuilder ConfigureLogging(this ConfigureHostBuilder host)
    {
        host.UseSerilog((hostContext, loggerConfiguration) =>
        {
            loggerConfiguration.ReadFrom.Configuration(hostContext.Configuration);
        });

        return host;
    }
}
