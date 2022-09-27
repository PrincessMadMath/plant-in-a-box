using Domain.IoT.Sensors;
using Domain.IoT.Sensors.SoilMoisture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PIB.Api.Setup;
using PIB.Infrastructure.Auth;

namespace PIB.Api.Controllers;

[ApiController]
[Route("sensors")]
[Authorize(Permissions.Plant)]
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
    public async Task<ActionResult<IReadOnlyList<ISensor>>> GetSensors()
    {
        var sensors = await this._soilMoistureService.GetSensors(UserContext.CurrentUser.Id).ToListAsync();
        return sensors;
    }
    
    // TODO: Return last  data
    [HttpGet("plant/{plantId}")]
    public async Task<ActionResult<IReadOnlyList<ISensor>>> GetPlantSensors(Guid plantId)
    {
        var sensors = await this._soilMoistureService.GetSensors(UserContext.CurrentUser.Id).ToListAsync();
        return sensors;
    }
    
    // TODO: Return last  data
    [HttpPost("plant/link")]
    public async Task<ActionResult> GetPlantSensors(LinkSensor linkSensor)
    {
        await this._soilMoistureService.LinkSensor(UserContext.CurrentUser.Id, linkSensor.SensorId, linkSensor.PlantId);
        return this.Ok();
    }
    
    public record LinkSensor(Guid PlantId, Guid SensorId);

    // TODO: Record for SensorId and ActuatorId?
    [HttpGet("{sensorId}")]
    public async Task<ActionResult<ISensor>> GetSensor(Guid sensorId)
    {
        var sensor = await this._soilMoistureService.GetSensor(UserContext.CurrentUser.Id, sensorId);
        return sensor;
    }
    
    [HttpPost("{sensorId}/addDataPoint")]
    public async Task<ActionResult<IReadOnlyList<SoilMoistureData>>> AddDataPoint(Guid sensorId, AddData addData)
    {
        await this._soilMoistureService.AddData(UserContext.CurrentUser.Id, sensorId, new SoilMoistureData(addData.Value, addData.Date));
        return this.Ok();
    }
    
    public record AddData(float Value, DateTimeOffset Date);


    // Make abstraction for data point?
    [HttpGet("{sensorId}/data")]
    public async Task<ActionResult<IReadOnlyList<SoilMoistureData>>> GetSensorHistory(Guid sensorId)
    {
        var dataPoints = await this._soilMoistureService.GetData(UserContext.CurrentUser.Id, sensorId).ToListAsync();
        return dataPoints;
    }

    // TODO: Use log type
    [HttpGet("{sensorId}/logs")]
    public IReadOnlyList<string> GetSensorLogs(Guid sensorId)
    {
        return ArraySegment<string>.Empty;
    }
}
