using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using PIB.Infrastructure.Auth;

namespace PIB.Api.Setup;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection ConfigureAuth(this IServiceCollection services)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.Authority = "https://dev-macadam.us.auth0.com/";
            options.Audience = "pib";
            // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
            options.TokenValidationParameters = new TokenValidationParameters
            {
                NameClaimType = ClaimTypes.NameIdentifier
            };
        });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("Plant.Read", policy => policy.Requirements.Add(new HasScopeRequirement("Plant.Read", "https://dev-macadam.us.auth0.com/")));
        });

        services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

        return services;
    }


}
