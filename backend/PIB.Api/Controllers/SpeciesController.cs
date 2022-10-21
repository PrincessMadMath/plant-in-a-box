using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PIB.Api.Setup;
using PIB.Domain.Species;
using PIB.Domain.Species.Commands;
using PIB.Domain.Species.Queries;

namespace PIB.Api.Controllers;

[ApiController]
[Route("species")]
[Authorize(Permissions.Plant)]
public class SpeciesController : ControllerBase
{
    private readonly ILogger<SensorsController> _logger;
    private readonly IMediator _mediator;

    public SpeciesController(ILogger<SensorsController> logger, IMediator mediator)
    {
        this._logger = logger;
        this._mediator = mediator;
    }
    
    [HttpGet("")]
    public async Task<ActionResult<IReadOnlyList<SpeciesDocument>>> GetAllSpecies()
    {
        var species = await this._mediator.CreateStream(new GetAllSpeciesQuery()).ToListAsync();

        return species;
    }
    
    [HttpGet("{speciesId}")]
    public async Task<ActionResult<SpeciesDocument>> GetSpecies(Guid speciesId)
    {
        var species = await this._mediator.Send(new GetSpeciesQuery(speciesId));

        if (species == null)
        {
            return this.NotFound();
        }

        return species;
    }
    
    [HttpPost("create")]
    public async Task<ActionResult<SpeciesDocument>> CreateSpecies(CreateSpeciesCommand createSpeciesCommand)
    {
        var species = await this._mediator.Send(createSpeciesCommand);
        
        return species;
    }
}
