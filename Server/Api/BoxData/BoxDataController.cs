using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.BoxData.Model;
using Microsoft.AspNetCore.Mvc;

namespace Api.BoxData
{
    [Route("box-data")]
    public class BoxDataController : ControllerBase
    {
        // GET
        [HttpGet("ground-humidity")]
        public async Task<IActionResult> GetGroundHumidity()
        {
            var groundHumidityData = new List<GroundHumidityDocument>
            {
                new()
                {
                    Humidity = 10.0f,
                    Date = DateTimeOffset.Parse("2020-10-01")
                },
                new()
                {
                    Humidity = 12.0f,
                    Date = DateTimeOffset.Parse("2020-11-01")
                },
                new()
                {
                    Humidity = 15.0f,
                    Date = DateTimeOffset.Parse("2021-01-01")
                },
                new()
                {
                    Humidity = 20.0f,
                    Date = DateTimeOffset.Parse("2021-02-01")
                },
                new()
                {
                    Humidity = 30.0f,
                    Date = DateTimeOffset.Parse("2021-03-01")
                }
            };

            return Ok(
                new
                {
                    Values = groundHumidityData
                });
        }
    }
}