using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants.Commands;

public record LinkPlantWithSoilMoistureSensorCommand(User User, Guid PlantId, Guid SensorId) : IRequest<bool>;

public class LinkPlantWithSoilMoistureSensorCommandHandler : IRequestHandler<LinkPlantWithSoilMoistureSensorCommand, bool>
{
    private readonly MongoRepository _mongoRepository;

    public LinkPlantWithSoilMoistureSensorCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }


    public async Task<bool> Handle(LinkPlantWithSoilMoistureSensorCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        await collection.UpdateOneAsync(
            Builders<PlantDocument>.Filter.Eq(x => x.UserId, command.User.Id) &
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            Builders<PlantDocument>.Update
                .Set(x => x.SoilMoistureSensorId, command.SensorId)
            , cancellationToken: cancellationToken);

        return true;
    }
}
