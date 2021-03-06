using Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Data.GroundHumidity.MongoImpl
{
    public class GroundHumidityMongoContext
    {
        private readonly IMongoDatabase _database = null;

        public GroundHumidityMongoContext(IOptions<MongoSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<GroundHumidityDatapointDocument> GroundHumidityDocuments => this._database.GetCollection<GroundHumidityDatapointDocument>("GroundHumidity");
    }
}