using System.Text.RegularExpressions;

namespace PIB.Infrastructure.Mongo;

[AttributeUsage(AttributeTargets.Class)]
public class MongoCollectionAttribute: Attribute
{
    private static readonly Regex ValidNameRegex = new Regex("^[a-z][a-zA-Z0-9]{0,63}$", RegexOptions.Compiled);

    public string CollectionName { get; }

    public MongoCollectionAttribute(string collectionName)
    {
        this.CollectionName = ValidNameRegex.IsMatch(collectionName) ? collectionName :  throw new ArgumentException($"Collection name must match the regex {ValidNameRegex}", nameof(collectionName));
    }
}
