using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Core.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Data.GroundHumidity.MongoImpl
{
    public class GroundHumidityRepository: IGroundHumidityRepository
    {
        private readonly GroundHumidityMongoContext _mongoContext = null;

        public GroundHumidityRepository(IOptions<MongoSettings> settings)
        {
            this._mongoContext = new GroundHumidityMongoContext(settings);
        }
        
        public async IAsyncEnumerable<GroundHumidityDatapoint> GetAllBoxDatapoint(Guid boxId)
        {
            var filter = Builders<GroundHumidityDatapointDocument>.Filter.Eq(x => x.BoxId, boxId);
            using (var cursor = await this._mongoContext.GroundHumidityDocuments.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    foreach (var document in cursor.Current)
                    {
                        yield return document.ToModel();
                    }
                }
            }
        }

        public async Task<GroundHumidityDatapoint> GetDatapoint(Guid datapointId)
        {
            var filter = Builders<GroundHumidityDatapointDocument>.Filter.Eq(x => x.DataPointId, datapointId);
            using (var cursor = await this._mongoContext.GroundHumidityDocuments.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    return cursor.Current.FirstOrDefault()?.ToModel();
                }
            }

            return null;
        }

        public Task AddGroundHumidity(GroundHumidityDatapoint datapointDocument)
        {
            return this._mongoContext.GroundHumidityDocuments.InsertOneAsync(datapointDocument.ToDocument());
        }

        public Task UpdateDatePointValue(Guid datapointId, float value)
        {
            var filter = Builders<GroundHumidityDatapointDocument>.Filter.Eq(x => x.DataPointId, datapointId);
            var update = Builders<GroundHumidityDatapointDocument>.Update.Set(x => x.Humidity, value);

            return this._mongoContext.GroundHumidityDocuments.UpdateOneAsync(filter, update);

        }
    }
}