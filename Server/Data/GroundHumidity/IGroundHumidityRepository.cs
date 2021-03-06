using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;

namespace Data.GroundHumidity
{
    public interface IGroundHumidityRepository
    {
        IAsyncEnumerable<GroundHumidityDatapoint> GetAllBoxDatapoint(Guid boxId);
        
        Task<GroundHumidityDatapoint> GetDatapoint(Guid datapointId);

        Task AddGroundHumidity(GroundHumidityDatapoint datapointDocument);
        
        Task UpdateDatePointValue(Guid datapointId, float value);
    }
}