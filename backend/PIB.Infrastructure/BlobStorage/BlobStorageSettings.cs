namespace PIB.Infrastructure.BlobStorage;

public class BlobStorageSettings
{
    public const string BlobStorage = "BlobStorage";

    public string ConnectionString { get; set; } = string.Empty;
    
    public string PlantPictureContainer { get; set; } = string.Empty;
}
