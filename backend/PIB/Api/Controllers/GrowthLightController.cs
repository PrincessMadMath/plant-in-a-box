using Domain.Actuators;
using Domain.Actuators.GrowthLight;
using Domain.Actuators.Light;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("growth-light")]
public class GrowthLightController : ControllerBase
{
    private readonly ILogger<GrowthLightController> _logger;
    private readonly GrowthLightService _growthLightService;

    public GrowthLightController(ILogger<GrowthLightController> logger, GrowthLightService growthLightService)
    {
        _logger = logger;
        _growthLightService = growthLightService;
    }
    
    [HttpPost("register")]
    public IActionResult Register([FromBody] GrowthLightActuator growthLightActuator)
    {
        this._growthLightService.RegisterActuator(growthLightActuator);

        return this.Ok();
    }
    
    
    [HttpGet("{actuatorId}/config")]
    public GrowthLightConfig GetConfig(Guid actuatorId)
    {
        return this._growthLightService.GetConfig(actuatorId);
    }
    
    [HttpPost("{actuatorId}/config/mode")]
    public IActionResult SetMode(Guid actuatorId, [FromBody] GrowthLightSettingMode mode)
    {
        this._growthLightService.SetMode(actuatorId, mode);
        
        return this.Ok();
    }
    
    [HttpPost("{actuatorId}/config/manual")]
    public IActionResult SetMode(Guid actuatorId, [FromBody] GrowthLightManualSettings manualSettings)
    {
        this._growthLightService.SetManualSettings(actuatorId, manualSettings);
        
        return this.Ok();
    }
    
    [HttpPost("{actuatorId}/config/automated")]
    public IActionResult SetMode(Guid actuatorId, [FromBody] GrowthLightAutomatedSettings automatedSettings)
    {
        this._growthLightService.SetAutomatedSettings(actuatorId, automatedSettings);
        
        return this.Ok();
    }
}