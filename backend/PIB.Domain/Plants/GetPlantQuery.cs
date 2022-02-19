using System.Runtime.CompilerServices;
using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants;

public class GetPlantQuery: IRequest<PlantDocument?>  
{
    public GetPlantQuery(Guid plantId)
    {
        this.PlantId = plantId;
    }

    public Guid PlantId { get; }
}

public class GetPlantQueryHandler : IRequestHandler<GetPlantQuery, PlantDocument?>
{
    private readonly MongoRepository _mongoRepository;

    public GetPlantQueryHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public Task<PlantDocument?> Handle(GetPlantQuery request, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();

        return collection.Find(Builders<PlantDocument>.Filter.Eq(x => x.PlantId, request.PlantId)).FirstOrDefaultNullableAsync(cancellationToken);
    }
}
