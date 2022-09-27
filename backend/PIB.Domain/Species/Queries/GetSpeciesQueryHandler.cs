using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace Domain.Species.Queries;

public record GetSpeciesQuery(Guid SpeciesId) : IRequest<SpeciesDocument?>;

public class GetSpeciesQueryHandler: IRequestHandler<GetSpeciesQuery, SpeciesDocument>
{
    private readonly MongoRepository _mongoRepository;

    public GetSpeciesQueryHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }

    public Task<SpeciesDocument?> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        var collection = this._mongoRepository.GetCollection<SpeciesDocument>();

        return collection.Find(Builders<SpeciesDocument>.Filter.Eq(x => x.SpeciesId, request.SpeciesId))
            .FirstOrDefaultNullableAsync(cancellationToken: cancellationToken);
    }
}
