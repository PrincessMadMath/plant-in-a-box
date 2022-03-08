using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants.Commands;

public record WaterPlantCommand(Guid PlantId) : IRequest<bool>;

public class WaterPlantCommandHandler : IRequestHandler<WaterPlantCommand, bool>
{
    private readonly MongoRepository _mongoRepository;

    public WaterPlantCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }


    public async Task<bool> Handle(WaterPlantCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        await collection.UpdateOneAsync(
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            Builders<PlantDocument>.Update.Set(x => x.Operations.LastWateredDate, DateTimeOffset.UtcNow)
            , cancellationToken: cancellationToken);

        return true;
    }
}
