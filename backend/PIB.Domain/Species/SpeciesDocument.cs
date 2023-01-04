using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Species;

[MongoCollection("Species")]
public class SpeciesDocument : MongoDocument
{
    public Guid SpeciesId { get; set; }

    public string Name { get; set; } = string.Empty;

    public TimeSpan WateringFrequency { get; set; }

    public TimeSpan FertilizationFrequency { get; set; }
}

public class SpeciesDocumentIndexBuilder : MongoIndexBuilder<SpeciesDocument>
{
    protected override IEnumerable<CreateIndexModel<SpeciesDocument>> GetIndexes()
    {
        yield return new CreateIndexModel<SpeciesDocument>(
            Builders<SpeciesDocument>.IndexKeys.Ascending(x => x.SpeciesId),
            new CreateIndexOptions { Unique = true }
        );
    }
}
