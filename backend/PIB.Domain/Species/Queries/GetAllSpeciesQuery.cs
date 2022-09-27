using Domain.Plants;
using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.Mongo;

namespace Domain.Species.Queries;

public record GetAllSpeciesQuery() : IStreamRequest<SpeciesDocument>;

public class GetAllSpeciesQueryHandler: IStreamRequestHandler<GetAllSpeciesQuery, SpeciesDocument>
{
    private readonly MongoRepository _mongoRepository;

    public GetAllSpeciesQueryHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public IAsyncEnumerable<SpeciesDocument> Handle(GetAllSpeciesQuery request, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<SpeciesDocument>();

        return collection.Find(Builders<SpeciesDocument>.Filter.Empty)
            .ToAsyncEnumerable(cancellationToken: cancellationToken);
    }
}
