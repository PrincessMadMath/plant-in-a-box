using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PIB.Api.Setup;
using PIB.Domain.Plants;
using PIB.Domain.Plants.Commands;
using PIB.Domain.Plants.Queries;
using PIB.Infrastructure.Auth;

namespace PIB.Api.Controllers;

[ApiController]
[Route("plants")]
[Authorize(Permissions.Plant)]
public class PlantsController : ControllerBase
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
        var plants = await this._mediator.CreateStream(new GetPlantsQuery(UserContext.CurrentUser)).ToListAsync();

        return plants;
    }

    [HttpGet("{plantId}")]
    public async Task<ActionResult<PlantDocument>> GetPlant(Guid plantId)
    {
        var plant = await this._mediator.Send(new GetPlantQuery(UserContext.CurrentUser, plantId));

        if (plant == null)
        {
            return this.NotFound();
        }

        return plant;
    }

    [HttpPost("create")]
    public async Task<ActionResult<PlantDocument>> CreatePlant(PlantsControllerModels.CreatePlantRequest request)
    {
        var newPlant = await this._mediator.Send(
            new CreatePlantCommand(
                UserContext.CurrentUser,
                request.Name,
                request.Species,
                request.Room,
                request.Pot,
                request.AcquisitionDate));

        return this.Ok(newPlant);
    }

    [HttpPost("update")]
    public async Task<ActionResult<PlantDocument>> UpdatePlant(PlantsControllerModels.UpdatePlantRequest request)
    {
        var updatePlant = await this._mediator.Send(new UpdatePlantCommand(
            UserContext.CurrentUser,
            request.PlantId,
            request.Name,
            request.Species,
            request.Room,
            request.Pot,
            request.AcquisitionDate));

        return this.Ok(updatePlant);
    }

    // TODO: Security check! (https://dotnetthoughts.net/file-upload-extension-validation-in-aspnet-core/)
    [HttpPost("{plantId}/image")]
    public async Task<ActionResult<UploadPlantPictureResponse>> UploadImage(Guid plantId, IFormFile file)
    {
        if (file.Length == 0 || file.Length > 16 * Math.Pow(1024, 2) || !this.SupportedImage.Contains(file.ContentType))
        {
            return this.BadRequest();
        }

        var response =
            await this._mediator.Send(new UploadPlantPictureCommand(UserContext.CurrentUser, plantId, file.OpenReadStream(), file.ContentType));

        return this.Ok(response);
    }

    [HttpGet("{plantId}/image")]
    [AllowAnonymous]
    public async Task<ActionResult> GetImageUrl(Guid plantId, [FromQuery] string etag)
    {
        try
        {
            var result = await this._mediator.Send(new GetPlantPictureUriQuery(plantId));

            return this.Redirect(result.ToString());
        }
        catch (Exception)
        {
            return this.NotFound();
        }
    }
    
    [HttpGet("{plantId}/imageUrl")]
    [AllowAnonymous]
    public async Task<ActionResult> GetImageUrl2(Guid plantId, [FromQuery] string etag)
    {
        try
        {
            var result = await this._mediator.Send(new GetPlantPictureUriQuery(plantId));

            return this.Ok(result.ToString());
        }
        catch (Exception)
        {
            return this.NotFound();
        }
    }

    [HttpPost("delete")]
    public async Task<ActionResult> DeletePlant(PlantsControllerModels.DeletePlantRequest request)
    {
        await this._mediator.Send(new DeletePlantCommand(
            UserContext.CurrentUser,
            request.PlantId
            ));

        return this.Ok();
    }

    [HttpPost("water")]
    public async Task<ActionResult> WaterPlant(PlantsControllerModels.WaterPlantRequest request)
    {
        await this._mediator.Send(new WaterPlantCommand(
            UserContext.CurrentUser,
            request.PlantId
        ));

        return this.Ok();
    }

    [HttpPost("fertilize")]
    public async Task<ActionResult> WaterPlant(PlantsControllerModels.FertilizePlantRequest request)
    {
        await this._mediator.Send(new FertilizePlantCommand(
            UserContext.CurrentUser,
            request.PlantId
        ));

        return this.Ok();
    }

    [HttpPost("repot")]
    public async Task<ActionResult> RepotPlant(PlantsControllerModels.RepotPlantRequest request)
    {
        await this._mediator.Send(new RepotPlantCommand(
            UserContext.CurrentUser,
            request.PlantId,
            request.Pot
        ));

        return this.Ok();
    }
    
    // TODO: Return last  data
    [HttpPost("linkSoilMoistureSensor")]
    public async Task<ActionResult> GetPlantSensors(PlantsControllerModels.LinkSoilMoistureSensorRequest request)
    {
        await this._mediator.Send(new LinkPlantWithSoilMoistureSensorCommand(
            UserContext.CurrentUser,
            request.PlantId,
            request.SensorId
        ));

        return this.Ok();
    }
}
