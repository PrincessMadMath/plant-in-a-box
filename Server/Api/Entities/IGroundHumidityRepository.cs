using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Entities
{
    public interface IGroundHumidityRepository
    {
        IAsyncEnumerable<GroundHumidityDatapointDocument> GetAllBoxDatapoint(Guid boxId);
        Task<GroundHumidityDatapointDocument> GetDatapoint(Guid datapointId);

        Task AddGroundHumidity(GroundHumidityDatapointDocument datapointDocument);
        Task UpdateDatePointValue(Guid datapointId, float value);
    }
}