using System.Reflection;
using MongoDB.Driver;

namespace PIB.Infrastructure.Mongo;

public abstract class MongoIndexBuilder<TDocument> where TDocument: MongoDocument
{
    public Task CreateIndexes(MongoRepository mongoRepository)
    {
        var indexes = this.GetIndexes();

        return mongoRepository.GetCollection<TDocument>().Indexes.CreateManyAsync(indexes);
    }
    
    protected abstract IEnumerable<CreateIndexModel<TDocument>> GetIndexes();
}
