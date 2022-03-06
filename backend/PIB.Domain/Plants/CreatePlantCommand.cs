using MediatR;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants;

public class CreatePlantCommand: IRequest<PlantDocument>
{
    public CreatePlantCommand(string name, string species, string room, string pot, DateTimeOffset acquisitionDate)
    {
        this.Name = name;
        this.Species = species;
        this.Room = room;
        this.Pot = pot;
        this.AcquisitionDate = acquisitionDate;
    }

    public string Name { get; }

    public string Species { get; } 

    public string Room { get; }
    
    public string Pot { get; }

    public DateTimeOffset AcquisitionDate { get; }
}

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
            AcquisitionDate = command.AcquisitionDate,
        };
        
        await collection.InsertOneAsync(newPlant, cancellationToken: cancellationToken);

        return newPlant;
    }
}
