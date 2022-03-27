using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace PIB.Api.Setup;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection ConfigureAuth(this IServiceCollection services, ConfigureHostBuilder host)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.Authority = "https://dev-macadam.us.auth0.com/";
            options.Audience = "pib";
        });
        
        return services;
    }
}
