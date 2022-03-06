using MediatR;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants.Commands;

public record CreatePlantCommand
    (string Name, string Species, string Room, string Pot) : IRequest<PlantDocument>;

public class CreatePlantCommandHandler : IRequestHandler<CreatePlantCommand, PlantDocument>
{
    private readonly MongoRepository _mongoRepository;

    public CreatePlantCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }


    public async Task<PlantDocument> Handle(CreatePlantCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();

        var newPlant = new PlantDocument()
        {
            PlantId = Guid.NewGuid(),
            Name = command.Name,
            Species = command.Species,
            Room = command.Room,
            Pot = command.Pot,
            AcquisitionDate = DateTimeOffset.UtcNow,
            Operations = new CaringOperations()
            {
                LastRepotDate = DateTimeOffset.UtcNow
            },
        };
        
        await collection.InsertOneAsync(newPlant, cancellationToken: cancellationToken);

        return newPlant;
    }
}
