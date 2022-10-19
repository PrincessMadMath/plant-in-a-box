using PIB.Infrastructure.Mongo;

namespace Domain.IoT.Sensors.SoilMoisture;

[Collection("SoilMoistureSensors")]
public class SoilMoistureSensorDocument : MongoDocument
{
    public string UserId { get; init; } = String.Empty;
    
    public Guid SensorId { get; init; }
    
    public string Name { get; init;  } = String.Empty;

    public SensorStatus Status { get; init; }

    public SoilMoistureData? LastDataPoint { get; set; }
}
