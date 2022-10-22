using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PIB.Api.Setup;
using PIB.Domain.IoT.Sensors;
using PIB.Domain.IoT.Sensors.Commands;
using PIB.Domain.IoT.Sensors.SoilMoisture;
using PIB.Infrastructure.Auth;

namespace PIB.Api.Controllers;

[ApiController]
[Route("sensors")]
[Authorize(Permissions.Plant)]
public class SensorsController : ControllerBase
{
    private readonly ILogger<SensorsController> _logger;
    private readonly SoilMoistureService _soilMoistureService;
    private readonly IMediator _mediator;


    // TODO: Add service that aggregate all sensors  service?
    public SensorsController(ILogger<SensorsController> logger, SoilMoistureService soilMoistureService, IMediator mediator)
    {
        this._logger = logger;
        this._soilMoistureService = soilMoistureService;
        this._mediator = mediator;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] SoilMoistureSensor soilMoistureSensor)
    {
        this._soilMoistureService.RegisterSensor(soilMoistureSensor);

        return this.Ok();
    }
    
    [HttpPost("generate")]
    public async Task<ActionResult> Generate()
    {
        await this._mediator.Send(new GenerateSensorsCommand(UserContext.CurrentUser, 5));

        return this.Ok();
    }

    [HttpGet("")]
    public async Task<ActionResult<IReadOnlyList<ISensor>>> GetSensors()
    {
        var sensors = await this._soilMoistureService.GetSensors(UserContext.CurrentUser.Id).ToListAsync();
        return sensors;
    }
    
    [HttpGet("plant/{plantId}")]
    public async Task<ActionResult<IReadOnlyList<ISensor>>> GetPlantSensors(Guid plantId)
    {
        var sensors = await this._soilMoistureService.GetSensors(UserContext.CurrentUser.Id).ToListAsync();
        return sensors;
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
