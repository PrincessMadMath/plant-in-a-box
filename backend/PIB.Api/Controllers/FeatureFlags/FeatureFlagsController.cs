using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PIB.Domain.FeatureFlags.Queries;

namespace PIB.Api.Controllers.FeatureFlags;

[ApiController]
[Route("features")]
[Authorize]
public class FeatureFlagsController : ControllerBase
{
    private readonly IMediator _mediator;

    public FeatureFlagsController(IMediator mediator)
    {
        this._mediator = mediator;
    }
    
    [HttpGet("")]
    public async Task<ActionResult<IReadOnlyCollection<string>>> GetPlants()
    {
        var enabledFeatures = await this._mediator.Send(new GetEnabledFeaturesQuery());

        return this.Ok(enabledFeatures);
    }
}
