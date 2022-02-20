namespace Domain.IoT.Sensors;

public interface ISensorData
{
    public float Value { get; }
    
    public DateTimeOffset Date { get; }
}