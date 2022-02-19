namespace Domain.IoT.Sensors;

public enum SensorType
{
    SoilMoisture = 1,
    SoilTemperature = 2,
    Humidity = 3,
}


public enum SensorStatus
{
    Online = 1,
    Offline = 2,
    Degraded = 3,
}