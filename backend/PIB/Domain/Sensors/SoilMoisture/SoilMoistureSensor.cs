namespace Domain.Sensors.SoilMoisture;

public class SoilMoistureSensor: ISensor
{
    public SoilMoistureSensor(Guid id, string name, SensorStatus status)
    {
        Id = id;
        Name = name;
        Status = status;
    }

    public Guid Id { get; }
    
    public string Name { get; }

    public SensorType Type => SensorType.SoilMoisture;
    
    public SensorStatus Status { get; }
}