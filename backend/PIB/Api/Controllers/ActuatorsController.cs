using Domain.Actuators;
using Domain.Actuators.GrowthLight;
using Domain.Device;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("actuators")]
public class ActuatorsController : ControllerBase
{
    private readonly ILogger<ActuatorsController> _logger;
    private readonly GrowthLightService _growthLightService;

    public ActuatorsController(ILogger<ActuatorsController> logger, GrowthLightService growthLightService)
    {
        _logger = logger;
        _growthLightService = growthLightService;
    }
    
    [HttpGet("")]
    public IReadOnlyList<IActuator> GetActuators()
    {
        return this._growthLightService.GetActuators();
    }
    
    [HttpGet("{actuatorId}")]
    public IActuator GetActuator(Guid actuatorId)
    {
        return this._growthLightService.GetActuator(actuatorId);
    }
    
    [HttpGet("{actuatorId}/logs")]
    public IReadOnlyCollection<DeviceLog> GetActuatorLogs(Guid actuatorId)
    {
        return this._growthLightService.GetLogs(actuatorId);
    }
    
    [HttpPost("{actuatorId}/logs")]
    public IActionResult PostActuatorLogs(Guid actuatorId, [FromBody] DeviceLog log)
    {
        this._growthLightService.AppendLog(actuatorId, log);

        return this.Ok();
    }
}