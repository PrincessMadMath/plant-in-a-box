using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants.Queries;

public record GetPlantsQuery(User User) : IStreamRequest<PlantDocument>;

public class GetPlantsQueryHandler : IStreamRequestHandler<GetPlantsQuery, PlantDocument>
{
    private readonly MongoRepository _mongoRepository;

    public GetPlantsQueryHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public IAsyncEnumerable<PlantDocument> Handle(GetPlantsQuery request, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<PlantDocument>();

        return collection.Find(Builders<PlantDocument>.Filter.Eq(x => x.UserId, request.User.Id))
            .ToAsyncEnumerable(cancellationToken: cancellationToken);
    }
}
