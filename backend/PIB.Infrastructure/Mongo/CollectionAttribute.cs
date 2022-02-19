namespace PIB.Infrastructure.Mongo;

public class CollectionAttribute:  System.Attribute
{
    public string CollectionName { get; }

    public CollectionAttribute(string collectionName)
    {
        this.CollectionName = collectionName;
    }
}
