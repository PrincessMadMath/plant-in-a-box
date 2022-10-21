using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.IoT.Sensors.SoilMoisture;

// Does not  support concurrent operations.
public class SoilMoistureService
{
    private readonly MongoRepository _mongoRepository;

    public SoilMoistureService(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }
    
    public Task RegisterSensor(SoilMoistureSensor sensor)
    {
        var collection = this._mongoRepository.GetCollection<SoilMoistureSensorDocument>();

        return collection.InsertOneAsync(new SoilMoistureSensorDocument()
        {
            SensorId = sensor.Id, Name = sensor.Name, Status = sensor.Status
        });
    }

    public async Task<SoilMoistureSensor> GetSensor(string userId, Guid sensorId)
    {
        var collection = this._mongoRepository.GetCollection<SoilMoistureSensorDocument>();
        
        var sensorDocument = await collection.Find(
                Builders<SoilMoistureSensorDocument>.Filter.Eq(x => x.UserId, userId) & 
                Builders<SoilMoistureSensorDocument>.Filter.Eq(x => x.SensorId, sensorId)
                )
            .FirstOrDefaultAsync();
        
        if (sensorDocument == null)
        {
            throw new ArgumentException("Sensor does not exist.");
        }

        // TODO: Query last data?
        return new SoilMoistureSensor(sensorDocument.SensorId, sensorDocument.Name, sensorDocument.Status, sensorDocument.LastDataPoint);
    }
    
    public async IAsyncEnumerable<SoilMoistureSensor> GetSensors(string userId)
    {
        var collection = this._mongoRepository.GetCollection<SoilMoistureSensorDocument>();

        var query = collection.Find(
                Builders<SoilMoistureSensorDocument>.Filter.Eq(x => x.UserId, userId)
            )
            .ToAsyncEnumerable();

        await foreach (var sensorDocument in query)
        {
            yield return new SoilMoistureSensor(sensorDocument.SensorId, sensorDocument.Name, sensorDocument.Status, sensorDocument.LastDataPoint); 
        }
    }

    public Task AddData(string userId, Guid sensorId, SoilMoistureData newData)
    {
        var collection = this._mongoRepository.GetCollection<SoilMoistureDataPointDocument>();

        return collection.InsertOneAsync(new SoilMoistureDataPointDocument()
        {
            UserId = userId, SensorId = sensorId, Value = newData.Value, Date = newData.Date,
        });
    }

    public async IAsyncEnumerable<SoilMoistureData> GetData(string userId, Guid sensorId)
    {
        var collection = this._mongoRepository.GetCollection<SoilMoistureDataPointDocument>();

        var query = collection.Find(
                Builders<SoilMoistureDataPointDocument>.Filter.Eq(x => x.UserId, userId) &
                Builders<SoilMoistureDataPointDocument>.Filter.Eq(x => x.SensorId, sensorId)
            )
            .ToAsyncEnumerable();

        await foreach (var sensorData in query)
        {
            yield return new SoilMoistureData(sensorData.Value, sensorData.Date); 
        }
    }
    
}
