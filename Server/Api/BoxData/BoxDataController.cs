using System;
using System.Threading.Tasks;
using Business.Services;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.BoxData
{
    [Route("box-data")]
    public class BoxDataController : ControllerBase
    {
        private readonly IGroundHumidityService groundHumidityService;

        public BoxDataController(IGroundHumidityService groundHumidityService)
        {
            this.groundHumidityService = groundHumidityService;
        }

        [HttpPost("populate-ground-humidity")]
        public async Task<IActionResult> SeedGroundHumidity(Guid boxId)
        {
            var result = await this.groundHumidityService.Seed(boxId);

            if (!result.IsSuccess)
            {
                return this.BadRequest(result.FailureReason);
            }

            return this.Ok();
        }

        [HttpPost("ground-humidity")]
        public async Task<IActionResult> GetGroundHumidity([FromBody] GroundHumidityDatapoint datapoint)
        {
            var result = await this.groundHumidityService.Add(datapoint);

            if (!result.IsSuccess)
            {
                return this.BadRequest(result.FailureReason);
            }

            return this.Ok();
        }

        // GET
        [HttpGet("ground-humidity")]
        public async Task<IActionResult> GetGroundHumidity(Guid boxId)
        {
            var datapointsRequest = await this.groundHumidityService.GetData(boxId);

            if (!datapointsRequest.IsSuccess)
            {
                return this.BadRequest(datapointsRequest.FailureReason);
            }

            return this.Ok(datapointsRequest.Result);
        }
    }
}
