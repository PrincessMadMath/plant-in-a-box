namespace PIB.Api.Controllers;

public class PlantsControllerModels
{
    public record CreatePlantRequest(string Name, string Species, string Room, string Pot,
        DateTimeOffset AcquisitionDate);

    public record UpdatePlantRequest(Guid PlantId, string Name, string Species, string Room, string Pot,
        DateTimeOffset AcquisitionDate);

    public record DeletePlantRequest(Guid PlantId);
    
    public record WaterPlantRequest(Guid PlantId);
    
    public record FertilizePlantRequest(Guid PlantId);
    
    public record RepotPlantRequest(Guid PlantId, string Pot);
}
