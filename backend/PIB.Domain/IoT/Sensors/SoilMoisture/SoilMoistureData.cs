namespace Domain.IoT.Sensors.SoilMoisture;

public class SoilMoistureData: ISensorData
{
    public float Value { get; set; }
    
    public DateTimeOffset Date { get; set; }
}