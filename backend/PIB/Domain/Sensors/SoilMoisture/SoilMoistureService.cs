namespace Domain.Sensors.SoilMoisture;

// Does not  support concurrent operations.
public class SoilMoistureService
{
    private readonly Dictionary<Guid, SoilMoistureSensor> _sensors = new();
    
    private readonly Dictionary<Guid, List<SoilMoistureData>> _sensorsData = new();
    
    public void RegisterSensor(SoilMoistureSensor sensor)
    {
        if (this._sensorsData.ContainsKey(sensor.Id))
        {
            throw new ArgumentException("Sensor already exist.");
        }
        
        _sensors.Add(sensor.Id, sensor);
    }

    public SoilMoistureSensor GetSensor(Guid sensorId)
    {
        if (this._sensors.TryGetValue(sensorId, out var sensor))
        {
            return sensor;
        }
        
        throw new ArgumentException("Sensor does not exist.");
    }
    
    public IReadOnlyList<SoilMoistureSensor> GetSensors(Guid sensorId)
    {
        return this._sensors.Values.ToList();
    }
    
    public void AddData(Guid sensorId, SoilMoistureData newData)
    {
        if (this._sensorsData.TryGetValue(sensorId, out var values))
        {
            values.Add(newData);
        }
        else
        {
            var data = new List<SoilMoistureData>() { newData };
            
            this._sensorsData.Add(sensorId, data);
        }
    }

    public IReadOnlyList<SoilMoistureData> GetData(Guid sensorId)
    {
        if (this._sensorsData.TryGetValue(sensorId, out var values))
        {
            return values;
        }
        else
        {
            return Array.Empty<SoilMoistureData>();
        }
    }
}