using System.Security.Cryptography.X509Certificates;

namespace Domain.IoT.Sensors.SoilMoisture;

public record SoilMoistureData(float Value, DateTimeOffset Date) : ISensorData;
