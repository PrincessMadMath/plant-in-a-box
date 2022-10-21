using PIB.Infrastructure.Mongo;

namespace PIB.Domain.IoT.Sensors.SoilMoisture;

// TODO: Currently this document design won't scale well
[Collection("SoilMoistureSensorDataPoints")]
public class SoilMoistureDataPointDocument : MongoDocument
{
    public string UserId { get; set; } = string.Empty;
    
    public Guid SensorId { get; set; }
    
    public float Value { get; set; }
    
    public DateTimeOffset Date { get; set; }
}
