using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Species;

[Collection("Species")]
public class SpeciesDocument : MongoDocument
{
    public Guid SpeciesId { get; set; }
    
    public string Name { get; set; } = string.Empty;

    public TimeSpan WateringFrequency { get; set;}
    
    public TimeSpan FertilizationFrequency { get; set;} 
}
