using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Plants.Commands;

public record UpdatePlantCommand
    (User User, Guid PlantId, string Name, string Species, string Room, string Pot, DateTimeOffset AcquisitionDate) : IRequest<PlantDocument>;


public class UpdatePlantCommandHandler : IRequestHandler<UpdatePlantCommand, PlantDocument>
{
    private readonly MongoRepository _mongoRepository;

    public UpdatePlantCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public async Task<PlantDocument> Handle(UpdatePlantCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        var updatedPlant = await collection.FindOneAndUpdateAsync(
            Builders<PlantDocument>.Filter.Eq(x => x.UserId, command.User.Id) &
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            Builders<PlantDocument>.Update.Set(x => x.Name, command.Name)
                .Set(x => x.Species, command.Species)
                .Set(x => x.Room, command.Room)
                .Set(x => x.Pot, command.Pot)
                .Set(x => x.AcquisitionDate, command.AcquisitionDate),
            new FindOneAndUpdateOptions<PlantDocument>()
            {
                ReturnDocument = ReturnDocument.After,
            }
            , cancellationToken: cancellationToken);

        return updatedPlant;
    }
}
