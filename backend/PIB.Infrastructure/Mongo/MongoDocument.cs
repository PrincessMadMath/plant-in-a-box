using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PIB.Infrastructure.Mongo;

[BsonIgnoreExtraElements(Inherited = true)]
public abstract class MongoDocument
{
    [BsonId] 
    public ObjectId Id { get; set; }
}
