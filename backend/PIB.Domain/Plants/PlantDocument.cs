using PIB.Infrastructure.Mongo;

namespace Domain.Plants;

[Collection("Plants")]
public class PlantDocument : MongoDocument
{
    public string UserId { get; set; } = string.Empty;
    
    public Guid PlantId { get; set; }
    
    public string Name { get; set; } = string.Empty;

    public string Species { get; set; } = string.Empty;

    public string Room { get; set; } = string.Empty;
    
    public string Pot { get; set; } = string.Empty;

    public DateTimeOffset AcquisitionDate { get; set; }

    public CaringOperations Operations { get; set; } = new CaringOperations();

    public Image Image { get; set; } = new Image();
}

public class CaringOperations
{
    public DateTimeOffset? LastWateredDate { get; set; }
    
    public DateTimeOffset? LastRepotDate { get; set; }
    
    public DateTimeOffset? LastFertilizedDate { get; set; }
}

public class Image
{
    public string Etag { get; set; } = string.Empty;
}
