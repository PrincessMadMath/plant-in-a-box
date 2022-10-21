using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Plants.Commands;

public record FertilizePlantCommand(User User, Guid PlantId) : IRequest<bool>;

public class FertilizePlantCommandHandler : IRequestHandler<FertilizePlantCommand, bool>
{
    private readonly MongoRepository _mongoRepository;

    public FertilizePlantCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }


    public async Task<bool> Handle(FertilizePlantCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        await collection.UpdateOneAsync(
            Builders<PlantDocument>.Filter.Eq(x => x.UserId, command.User.Id) &
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            Builders<PlantDocument>.Update.Set(x => x.Operations.LastFertilizedDate, DateTimeOffset.UtcNow)
            , cancellationToken: cancellationToken);

        return true;
    }
}
