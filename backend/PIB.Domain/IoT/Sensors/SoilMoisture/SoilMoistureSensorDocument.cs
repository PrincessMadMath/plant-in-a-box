using PIB.Infrastructure.Mongo;

namespace Domain.IoT.Sensors.SoilMoisture;

public class SoilMoistureSensorDocument : MongoDocument
{
    public string UserId { get; init; } = String.Empty;
    
    public Guid SensorId { get; init; }
    
    public string Name { get; init;  } = String.Empty;

    public Guid? PlantId { get; set; }

    public SensorStatus Status { get; init; }
}
