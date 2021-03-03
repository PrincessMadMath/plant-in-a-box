using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Api.Entities
{
    public class GroundHumidityRepository: IGroundHumidityRepository
    {
        private readonly GroundHumidityMongoContext _mongoContext = null;

        public GroundHumidityRepository(IOptions<MongoSettings> settings)
        {
            this._mongoContext = new GroundHumidityMongoContext(settings);
        }
        
        public async IAsyncEnumerable<GroundHumidityDatapointDocument> GetAllBoxDatapoint(Guid boxId)
        {
            var filter = Builders<GroundHumidityDatapointDocument>.Filter.Eq(x => x.BoxId, boxId);
            using (var cursor = await this._mongoContext.GroundHumidityDocuments.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    foreach (var document in cursor.Current)
                    {
                        yield return document;
                    }
                }
            }
        }

        public async Task<GroundHumidityDatapointDocument> GetDatapoint(Guid datapointId)
        {
            var filter = Builders<GroundHumidityDatapointDocument>.Filter.Eq(x => x.DataPointId, datapointId);
            using (var cursor = await this._mongoContext.GroundHumidityDocuments.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    return cursor.Current.FirstOrDefault();
                }
            }

            return null;
        }

        public Task AddGroundHumidity(GroundHumidityDatapointDocument datapointDocument)
        {
            return this._mongoContext.GroundHumidityDocuments.InsertOneAsync(datapointDocument);
        }

        public Task UpdateDatePointValue(Guid datapointId, float value)
        {
            var filter = Builders<GroundHumidityDatapointDocument>.Filter.Eq(x => x.DataPointId, datapointId);
            var update = Builders<GroundHumidityDatapointDocument>.Update.Set(x => x.Humidity, value);

            return this._mongoContext.GroundHumidityDocuments.UpdateOneAsync(filter, update);

        }
    }
}