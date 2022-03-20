using System.Reflection;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PIB.Infrastructure.Mongo;

namespace PIB.Infrastructure.BlobStorage;

public static partial class ServiceCollectionExtensions
{
    public static IServiceCollection AddAndConfigureBlobStorage(this IServiceCollection services, ConfigurationManager config)
    {
        services.Configure<BlobStorageSettings>(
            config.GetSection(BlobStorageSettings.BlobStorage));

        services.AddSingleton<PlantPictureRepository>();

        return services;
    }
}
