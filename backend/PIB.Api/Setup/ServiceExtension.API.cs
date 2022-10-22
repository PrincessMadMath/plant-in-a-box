using PIB.Infrastructure.AppConfiguration;
using PIB.Infrastructure.Auth;
using Serilog;

namespace PIB.Api.Setup;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection ConfigureAPI(this IServiceCollection services,  ConfigurationManager config)
    {
        services.ConfigureCors();

        services.AddControllers().AddJsonOptions(o =>
        {
            o.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
        });

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return services;
    }

    // TODO: TEMPORARY
    // Check: https://stackoverflow.com/questions/35553500/xmlhttprequest-cannot-load-xxx-no-access-control-allow-origin-header
    // Check: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
    private static IServiceCollection ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(o => o.AddPolicy("AllowAll", builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        }));

        return services;
    }

    public static WebApplication UseApi(this WebApplication app)
    {
        app.UseSerilogRequestLogging();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowAll");

        app.UseHttpsRedirection();

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseMiddleware<UserContextMiddleware>();

        app.MapControllers();

        app.UseAppConfig();

        app.Run();

        return app;
    }
}
