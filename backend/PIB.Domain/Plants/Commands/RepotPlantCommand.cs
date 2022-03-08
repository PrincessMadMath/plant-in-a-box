using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants.Commands;

public record RepotPlantCommand(Guid PlantId, string Pot) : IRequest<bool>;

public class RepotPlantCommandHandler : IRequestHandler<RepotPlantCommand, bool>
{
    private readonly MongoRepository _mongoRepository;

    public RepotPlantCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }


    public async Task<bool> Handle(RepotPlantCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        await collection.UpdateOneAsync(
            
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            Builders<PlantDocument>.Update
                .Set(x => x.Operations.LastRepotDate, DateTimeOffset.UtcNow)
                .Set(x => x.Pot, command.Pot)
            , cancellationToken: cancellationToken);

        return true;
    }
}
