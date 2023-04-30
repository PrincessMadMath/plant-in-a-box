namespace PIB.Infrastructure.Mongo;

public class MongoCollectionAttribute:  System.Attribute
{
    public string CollectionName { get; }

    public MongoCollectionAttribute(string collectionName)
    {
        this.CollectionName = collectionName;
    }
}
