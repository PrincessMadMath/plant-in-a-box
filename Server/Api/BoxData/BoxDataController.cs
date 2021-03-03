using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.BoxData
{
    [Route("box-data")]
    public class BoxDataController : ControllerBase
    {
        private readonly IGroundHumidityRepository _groundHumidityRepository;

        public BoxDataController(IGroundHumidityRepository groundHumidityRepository)
        {
            _groundHumidityRepository = groundHumidityRepository;
        }
        
        [HttpPost("populate-ground-humidity")]
        public async Task<IActionResult> SeedGroundHumidity()
        {
            var boxId = Guid.Parse("f509aaa7-3dde-43be-a178-94eb27556969");
            await this._groundHumidityRepository.AddGroundHumidity(new()
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 10.0f,
                Date = DateTimeOffset.Parse("2020-10-01")
            });
 
            await this._groundHumidityRepository.AddGroundHumidity(new()
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 15.0f,
                Date = DateTimeOffset.Parse("2020-10-02")
            });

            await this._groundHumidityRepository.AddGroundHumidity(new()
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 20.0f,
                Date = DateTimeOffset.Parse("2020-10-03")
            });
            
            await this._groundHumidityRepository.AddGroundHumidity(new()
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 30.0f,
                Date = DateTimeOffset.Parse("2020-10-04")
            });

            
            await this._groundHumidityRepository.AddGroundHumidity(new()
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 40.0f,
                Date = DateTimeOffset.Parse("2020-10-05")
            });

            return this.Ok();

        }
        
        // GET
        [HttpGet("ground-humidity")]
        public async Task<IActionResult> GetGroundHumidity()
        {
            var datapoint = await this._groundHumidityRepository.GetAllBoxDatapoint(Guid.Parse("f509aaa7-3dde-43be-a178-94eb27556969")).ToListAsync();
            return Ok(
                new
                {
                    Values = datapoint
                });
        }
    }
}