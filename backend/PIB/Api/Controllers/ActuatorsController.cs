using Domain.Actuators;
using Domain.Actuators.GrowthLight;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("actuators")]
public class ActuatorsController
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
    public IReadOnlyList<string> GetActuatorLogs(Guid actuatorId)
    {
        return ArraySegment<string>.Empty;
    }
}