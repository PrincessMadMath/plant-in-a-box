namespace Domain.Sensors;

public interface ISensor
{
    public Guid Id { get; }

    public string Name { get; }

    public SensorType Type { get; }
    
    public SensorStatus Status { get; }
}