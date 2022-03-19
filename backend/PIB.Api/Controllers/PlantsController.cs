using Domain.Plants;
using Domain.Plants.Commands;
using Domain.Plants.Queries;
using Domain.Test;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PIB.Api.Controllers;

[ApiController]
[Route("plants")]
public class PlantsController: ControllerBase
{
    private readonly ILogger<PlantsController> _logger;
    private readonly IMediator _mediator;
    
    public readonly HashSet<string> SupportedImage = new() { "image/png", "image/gif", "image/jpeg" };

    public PlantsController(ILogger<PlantsController> logger, IMediator mediator)
    {
        this._logger = logger;
        this._mediator = mediator;
    }
    
    [HttpGet("")]
    public async Task<ActionResult<IReadOnlyList<PlantDocument>>> GetPlants()
    {
        var plants = await this._mediator.CreateStream(new GetPlantsQuery()).ToListAsync();

        return plants;
    }

    [HttpGet("{plantId}")]
    public async Task<ActionResult<PlantDocument>> GetPlant(Guid plantId)
    {
        var plant = await this._mediator.Send(new GetPlantQuery(plantId));

        if (plant == null)
        {
            return this.NotFound();
        }

        return plant;
    }
    
    [HttpPost("create")]
    public async Task<ActionResult<PlantDocument>> CreatePlant(CreatePlantCommand command)
    {
        var newPlant = await this._mediator.Send(command);

        return this.Ok(newPlant);
    }
    
    [HttpPost("update")]
    public async Task<ActionResult<PlantDocument>> UpdatePlant(UpdatePlantCommand command)
    {
        var updatePlant = await this._mediator.Send(command);

        return this.Ok(updatePlant);
    }

    // TODO: Security check! (https://dotnetthoughts.net/file-upload-extension-validation-in-aspnet-core/)
    [HttpPost("{plantId}/image")]
    public async Task<ActionResult> UploadImage(Guid plantId, IFormFile file)
    {
        if (file.Length == 0 || file.Length > 3 * Math.Pow(1024, 2) || !SupportedImage.Contains(file.ContentType))
        {
            return this.BadRequest();
        }

        await this._mediator.Send(new UploadPlantPictureCommand(plantId, file.OpenReadStream(), file.ContentType));

        return this.Ok();
    }
    
    [HttpGet("{plantId}/image")]
    public async Task<ActionResult> GetImage(Guid plantId)
    {
        try
        {
            var result = await this._mediator.Send(new GetPlantPictureQuery(plantId));

            return  new FileStreamResult(result.Stream, result.mimeType);
        }
        catch (Exception e)
        {
            return this.NotFound();
        }

    }
    
    [HttpPost("delete")]
    public async Task<ActionResult> DeletePlant(DeletePlantCommand command)
    {
        var newPlant = await this._mediator.Send(command);

        return this.Ok();
    }

    [HttpPost("water")]
    public async Task<ActionResult> WaterPlant(WaterPlantCommand command)
    {
        await this._mediator.Send(command);

        return this.Ok();
    }
    
    [HttpPost("fertilize")]
    public async Task<ActionResult> WaterPlant(FertilizePlantCommand command)
    {
        await this._mediator.Send(command);

        return this.Ok();
    }
    
    [HttpPost("repot")]
    public async Task<ActionResult> RepotPlant(RepotPlantCommand command)
    {
        await this._mediator.Send(command);

        return this.Ok();
    }

}
