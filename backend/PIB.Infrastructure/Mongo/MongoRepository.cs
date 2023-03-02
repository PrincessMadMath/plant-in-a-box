using System.Collections.Immutable;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace PIB.Infrastructure.Mongo;

public class MongoRepository
{
    private readonly IMongoDatabase _database;

    public MongoRepository(IOptions<MongoSettings> mongoOption)
    {
        var mongoSetting = MongoClientSettings.FromConnectionString(mongoOption.Value.ConnectionString);
        
        BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
#pragma warning disable CS0618
        // Required since guid representation is not respected in filter definition https://jira.mongodb.org/projects/CSHARP/issues/CSHARP-3179?filter=allopenissues
        // Thread explaining work around: https://www.mongodb.com/community/forums/t/c-driver-2-11-1-allegedly-use-different-guid-representation-for-insert-and-for-find/8536/3
        BsonDefaults.GuidRepresentationMode = GuidRepresentationMode.V3;
#pragma warning restore CS0618
        
        var client = new MongoClient(mongoSetting);
        this._database = client.GetDatabase(mongoOption.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>() where T : MongoDocument
    {
        var collectionName =MongoUtils.GetCollectionName<T>();
        
        return this._database.GetCollection<T>(collectionName);
    }
}
