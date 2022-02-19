using Domain.Test;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PIB.Infrastructure.MediatR;
using Serilog.Context;

namespace PIB.Api.Controllers;

[ApiController]
[Route("test")]
public class TestController : ControllerBase
{
    private readonly ILogger<TestController> _logger;
    private readonly IMediator _mediator;

    public TestController(ILogger<TestController> logger, IMediator mediator)
    {
        this._logger = logger;
        this._mediator = mediator;
    }
    
    [HttpGet("InfrastructureMediatRQuery")]
    public Task<TestDocument> GetInfrastructureMediatR()
    {
        return this._mediator.Send(new TestRequestQuery(10));
    }
    
    [HttpGet("DomainMediatRQuery")]
    public Task<string> GetDomainMediatR()
    {
        return this._mediator.Send(new TestDomainRequestQuery(10));
    }
    
    [HttpGet("Log")]
    public Task<TestDocument> Log()
    {
        using (LogContext.PushProperty("Random", "correlated-value"))
        {
            Serilog.Log
                .ForContext("ErrorCode", 1)
                .Error("Error log");
            
            this._logger
                .LogError("Error log with {ErrorCode}", 1);
        }

        return this._mediator.Send(new TestRequestQuery(10));
    }
    
    [HttpGet("Exception")]
    public Task<string> Exception()
    {
        throw new ArithmeticException("Ho ho");
    }
}
