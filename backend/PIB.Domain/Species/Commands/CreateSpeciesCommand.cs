using MediatR;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Species.Commands;

public record CreateSpeciesCommand(string Name, TimeSpan WateringFrequency, TimeSpan FertilizationFrequency) : IRequest<SpeciesDocument>;

public class CreateSpeciesCommandHandler: IRequestHandler<CreateSpeciesCommand, SpeciesDocument> 
{
    private readonly MongoRepository _mongoRepository;

    public CreateSpeciesCommandHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public async Task<SpeciesDocument> Handle(CreateSpeciesCommand command, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<SpeciesDocument>();

        var newSpecies = new SpeciesDocument()
        {
            SpeciesId = Guid.NewGuid(),
            Name = command.Name,
            WateringFrequency = command.WateringFrequency,
            FertilizationFrequency = command.FertilizationFrequency,
        };
        
        await collection.InsertOneAsync(newSpecies, cancellationToken: cancellationToken);

        return newSpecies;
    }
}
