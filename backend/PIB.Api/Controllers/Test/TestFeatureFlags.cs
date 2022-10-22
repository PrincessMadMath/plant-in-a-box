using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.FeatureManagement;
using PIB.Domain.FeatureFlags;

namespace PIB.Api.Controllers.Test;

[ApiController]
[Route("tests/featureFlags")]
public class TestFeatureFlags : ControllerBase
{
    private readonly IFeatureManager _featureManager;

    public TestFeatureFlags(IFeatureManager featureManager)
    {
        this._featureManager = featureManager;
    }
    
    [HttpGet("isFeatureAEnabled")]
    public async Task<ActionResult<bool>> IsFeatureAEnable()
    {
        var isEnable = await this._featureManager.IsEnabledAsync(FeatureFlags.FeatureA);
        return isEnable;
    }
    
    [HttpGet("allFeatureFlags")]
    public async Task<ActionResult<IReadOnlyCollection<string>>> AllFeatureFlag()
    {
        Type t = typeof(FeatureFlags);
        var fields = t.GetFields(BindingFlags.Static | BindingFlags.Public);

        var featureFlags = fields.Select(x => x.GetValue(null)?.ToString() ?? string.Empty).Where(x => !string.IsNullOrEmpty(x));

        return featureFlags.ToList();
    }
    
    [HttpGet("activatedFeatureFlags")]
    public async Task<ActionResult<IReadOnlyCollection<string>>> ActivatedFeatureFlag()
    {
        Type t = typeof(FeatureFlags);
        var fields = t.GetFields(BindingFlags.Static | BindingFlags.Public);

        var featureFlags = fields.Select(x => x.GetValue(null)?.ToString() ?? string.Empty).Where(x => !string.IsNullOrEmpty(x));

        var activatedFeatureFlags = new List<string>();

        foreach (var featureFlag in featureFlags)
        {
            var isEnabled = await this._featureManager.IsEnabledAsync(featureFlag);
            if (isEnabled)
            {
                activatedFeatureFlags.Add(featureFlag);
            }
        }
        
        return activatedFeatureFlags;
    }
}
