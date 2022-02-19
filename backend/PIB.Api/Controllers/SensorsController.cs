using Domain.IoT.Sensors;
using Domain.IoT.Sensors.SoilMoisture;
using Microsoft.AspNetCore.Mvc;

namespace PIB.Api.Controllers;

[ApiController]
[Route("sensors")]
public class SensorsController : ControllerBase
{
    private readonly ILogger<SensorsController> _logger;
    private readonly SoilMoistureService _soilMoistureService;

    // TODO: Add service that aggregate all sensors  service?
    public SensorsController(ILogger<SensorsController> logger, SoilMoistureService soilMoistureService)
    {
        this._logger = logger;
        this._soilMoistureService = soilMoistureService;
    }
    
    [HttpPost("register")]
    public IActionResult Register([FromBody] SoilMoistureSensor soilMoistureSensor)
    {
        this._soilMoistureService.RegisterSensor(soilMoistureSensor);

        return this.Ok();
    }
    
    // TODO: Return last  data
    [HttpGet("")]
    public IReadOnlyList<ISensor> GetSensors()
    {
        return this._soilMoistureService.GetSensors();
    }
    
    // TODO: Record for SensorId and ActuatorId?
    [HttpGet("{sensorId}")]
    public ISensor GetSensor(Guid sensorId)
    {
        return this._soilMoistureService.GetSensor(sensorId);
    }
    
    // Make abstraction for data point?
    [HttpGet("{sensorId}/data")]
    public IReadOnlyList<SoilMoistureData> GetSensorHistory(Guid sensorId)
    {
        return this._soilMoistureService.GetData(sensorId);
    }
    
    // TODO: Use  log type
    [HttpGet("{sensorId}/logs")]
    public IReadOnlyList<string> GetSensorLogs(Guid sensorId)
    {
        return ArraySegment<string>.Empty;
    }
}
