using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace PIB.Infrastructure.Mongo;

public class MongoRepository
{
    private readonly MongoClient _client;
    private readonly IMongoDatabase _database;

    public MongoRepository(IOptions<MongoSettings> mongoOption)
    {
        var mongoSetting = MongoClientSettings.FromConnectionString(mongoOption.Value.ConnectionString);
        this._client = new MongoClient(mongoSetting);
        this._database = this._client.GetDatabase(mongoOption.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>() where T : MongoDocument
    {
        var collectionName =MongoUtils.GetCollectionName<T>();
        
        return this._database.GetCollection<T>(collectionName);
    }
}
