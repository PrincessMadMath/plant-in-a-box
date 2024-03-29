using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Plants.Commands;

public record DeletePlantCommand(User User, Guid PlantId) : IRequest<bool>;

public class DeletePlantCommandHandler : IRequestHandler<DeletePlantCommand, bool>
{
    private readonly MongoRepository _mongoRepository;

    public DeletePlantCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }


    public async Task<bool> Handle(DeletePlantCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        await collection.DeleteOneAsync(
            Builders<PlantDocument>.Filter.Eq(x => x.UserId, command.User.Id) &
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            cancellationToken: cancellationToken);

        return true;
    }
}
