using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Common;
using Core.Models;
using Data.GroundHumidity;

namespace Business.Services
{
    public class GroundHumidityService : IGroundHumidityService
    {
        private readonly IGroundHumidityRepository repository;

        public GroundHumidityService(IGroundHumidityRepository repository)
        {
            this.repository = repository;
        }

        public async Task<OperationResult> Seed(Guid boxId)
        {
            await this.repository.AddGroundHumidity(new GroundHumidityDatapoint
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 10.0f,
                Date = DateTimeOffset.Parse("2020-10-01"),
            });

            await this.repository.AddGroundHumidity(new GroundHumidityDatapoint
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 15.0f,
                Date = DateTimeOffset.Parse("2020-10-02"),
            });

            await this.repository.AddGroundHumidity(new GroundHumidityDatapoint
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 20.0f,
                Date = DateTimeOffset.Parse("2020-10-03"),
            });

            await this.repository.AddGroundHumidity(new GroundHumidityDatapoint
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 30.0f,
                Date = DateTimeOffset.Parse("2020-10-04"),
            });

            await this.repository.AddGroundHumidity(new GroundHumidityDatapoint
            {
                BoxId = boxId,
                DataPointId = Guid.NewGuid(),
                Humidity = 40.0f,
                Date = DateTimeOffset.Parse("2020-10-05"),
            });

            return OperationResult.Success();
        }

        public async Task<OperationResult> Add(GroundHumidityDatapoint datapoint)
        {
            await this.repository.AddGroundHumidity(datapoint);

            return OperationResult.Success();
        }

        public async Task<RequestResult<List<GroundHumidityDatapoint>>> GetData(Guid boxId)
        {
            var datapoints = await this.repository.GetAllBoxDatapoint(boxId).ToListAsync();

            return RequestResultFactory.Success(datapoints);
        }
    }
}
