using Domain.Plants;
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

    public PlantsController(ILogger<PlantsController> logger, IMediator mediator)
    {
        this._logger = logger;
        this._mediator = mediator;
    }
    
    [HttpPost("create")]
    public async Task<ActionResult<PlantDocument>> CreatePlant(CreatePlantCommand command)
    {
        var newPlant = await this._mediator.Send(command);

        return newPlant;
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
}
