namespace PIB.Infrastructure.Mongo;

public class MongoSettings
{
    public const string Mongo = "Mongo";

    public string ConnectionString { get; set; } = string.Empty;
    
    public string DatabaseName { get; set; } = string.Empty;
}
