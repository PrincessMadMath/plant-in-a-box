using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Common;
using Core.Models;

namespace Business.Services
{
    public interface IGroundHumidityService
    {
        Task<OperationResult> Seed(Guid boxId);
        
        Task<RequestResult<List<GroundHumidityDatapoint>>> GetData(Guid boxId);
    }
}