using System.Reflection;
using MediatR;
using Microsoft.FeatureManagement;

namespace PIB.Domain.FeatureFlags.Queries;

public record GetEnabledFeaturesQuery : IRequest<IReadOnlyCollection<string>>;

public class GetEnabledFeaturesQueryHandler : IRequestHandler<GetEnabledFeaturesQuery, IReadOnlyCollection<string>>
{
    private readonly IFeatureManager _featureManager;

    public GetEnabledFeaturesQueryHandler(IFeatureManager featureManager)
    {
        this._featureManager = featureManager;
    }

    public async Task<IReadOnlyCollection<string>> Handle(GetEnabledFeaturesQuery request,
        CancellationToken cancellationToken)
    {
        var activatedFeatureFlags = new List<string>();

        foreach (var featureFlag in GetFeatureFlags())
        {
            var isEnabled = await this._featureManager.IsEnabledAsync(featureFlag);
            if (isEnabled)
            {
                activatedFeatureFlags.Add(featureFlag);
            }
        }

        return activatedFeatureFlags;
    }

    private static IReadOnlyCollection<string> GetFeatureFlags()
    {
        var t = typeof(DomainFeatureFlags);
        var fields = t.GetFields(BindingFlags.Static | BindingFlags.Public);

        return fields
            .Select(x => x.GetValue(null)?.ToString() ?? string.Empty)
            .Where(x => !string.IsNullOrEmpty(x))
            .ToList();
    }
}
