namespace Domain.IoT.Sensors;

public interface ISensor
{
    public Guid Id { get; }

    public string Name { get; }

    public SensorType Type { get; }
    
    public SensorStatus Status { get; }

    public ISensorData? LastData { get; }
}
