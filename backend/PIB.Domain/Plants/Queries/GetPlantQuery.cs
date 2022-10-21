using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Plants.Queries;

public record GetPlantQuery(User User, Guid PlantId) : IRequest<PlantDocument?>;  

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

        return collection.Find(
            Builders<PlantDocument>.Filter.Eq(x => x.UserId, request.User.Id) & 
                Builders<PlantDocument>.Filter.Eq(x => x.PlantId, request.PlantId))
            .FirstOrDefaultNullableAsync(cancellationToken);
    }
}
