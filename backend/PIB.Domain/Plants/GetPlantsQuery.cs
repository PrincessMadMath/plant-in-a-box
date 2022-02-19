using System.Runtime.CompilerServices;
using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants;

public class GetPlantsQuery: IStreamRequest<PlantDocument>
{
}

public class GetPlantsQueryHandler : IStreamRequestHandler<GetPlantsQuery, PlantDocument>
{
    private readonly MongoRepository _mongoRepository;

    public GetPlantsQueryHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public async IAsyncEnumerable<PlantDocument> Handle(GetPlantsQuery request, [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();

        await foreach (var plant in collection.Find(FilterDefinition<PlantDocument>.Empty).ToAsyncEnumerable(cancellationToken: cancellationToken))
        {
            yield return plant;
        }
    }
}
