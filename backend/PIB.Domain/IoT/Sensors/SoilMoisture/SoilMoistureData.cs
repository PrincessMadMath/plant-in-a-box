namespace PIB.Domain.IoT.Sensors.SoilMoisture;

public record SoilMoistureData(float Value, DateTimeOffset Date) : ISensorData;
