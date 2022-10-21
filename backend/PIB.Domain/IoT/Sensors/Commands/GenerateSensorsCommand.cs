using MediatR;
using PIB.Domain.IoT.Sensors.SoilMoisture;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.IoT.Sensors.Commands;

public record GenerateSensorsCommand(User User, int Count) : IRequest;

public class GenerateSensorsCommandHandler : IRequestHandler<GenerateSensorsCommand>
{
    private readonly MongoRepository _mongoRepository;

    public GenerateSensorsCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public async Task<Unit> Handle(GenerateSensorsCommand request, CancellationToken cancellationToken)
    {
        for (int i = 0; i < request.Count; i++)
        {
            await this.Generate(request.User.Id);
        }

        // da fuck
        return new Unit();
    }

    private async Task Generate(string userId)
    {
        var sensorId = Guid.NewGuid();

        var dataPointCollection = this._mongoRepository.GetCollection<SoilMoistureDataPointDocument>();
        var random = new Random();

        var dataPoints = Enumerable.Range(0, 200).Select(index => new SoilMoistureDataPointDocument()
        {
            UserId = userId,
            SensorId = sensorId,
            Value = index + random.Next(5),
            Date = DateTimeOffset.UtcNow - TimeSpan.FromHours(index),
        }).ToList();

        await dataPointCollection.InsertManyAsync(dataPoints);

        var lastDataPoint = dataPoints.First();

        var sensorCollection = this._mongoRepository.GetCollection<SoilMoistureSensorDocument>();
        await sensorCollection.InsertOneAsync(new SoilMoistureSensorDocument()
        {
            UserId = userId,
            SensorId = sensorId,
            Name = $"Sensor-{sensorId.ToString().Substring(0, 3)}",
            Status = SensorStatus.Online,
            LastDataPoint = new SoilMoistureData(lastDataPoint.Value, lastDataPoint.Date)
        });
    }
}
