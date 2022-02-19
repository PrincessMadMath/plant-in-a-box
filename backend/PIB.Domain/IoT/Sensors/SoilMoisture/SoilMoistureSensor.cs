namespace Domain.IoT.Sensors.SoilMoisture;

public class SoilMoistureSensor: ISensor
{
    public SoilMoistureSensor(Guid id, string name, SensorStatus status, ISensorData lastData)
    {
        this.Id = id;
        this.Name = name;
        this.Status = status;
        this.LastData = lastData;
    }

    public Guid Id { get; }
    
    public string Name { get; }

    public SensorType Type => SensorType.SoilMoisture;
    
    public SensorStatus Status { get; }
    
    public ISensorData LastData { get; }
}