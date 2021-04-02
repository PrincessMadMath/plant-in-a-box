using Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Data.GroundHumidity.MongoImpl
{
    public class GroundHumidityMongoContext
    {
        private readonly IMongoDatabase database;

        public GroundHumidityMongoContext(IOptions<MongoSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            this.database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<GroundHumidityDatapointDocument> GroundHumidityDocuments =>
            this.database.GetCollection<GroundHumidityDatapointDocument>("GroundHumidity");
    }
}
