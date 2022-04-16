using Domain.IoT.Actuators.GrowthLight;
using Microsoft.AspNetCore.Mvc;

namespace PIB.Api.Controllers;

[ApiController]
[Route("growth-light")]
public class GrowthLightController : ControllerBase
{
    private readonly GrowthLightService _growthLightService;
    private readonly ILogger<GrowthLightController> _logger;

    public GrowthLightController(ILogger<GrowthLightController> logger, GrowthLightService growthLightService)
    {
        this._logger = logger;
        this._growthLightService = growthLightService;
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
    public IActionResult SetMode(Guid actuatorId, [FromBody] SettingModeModel modeModel)
    {
        this._growthLightService.SetMode(actuatorId, modeModel.Mode);

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

    public class SettingModeModel
    {
        public GrowthLightSettingMode Mode { get; set; }
    }
}
