using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Entities
{
    public class GroundHumidityDatapointDocument
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public Guid DataPointId { get; set; }
        
        public Guid BoxId { get; set; }
        
        public float Humidity { get; set; }
        
        public DateTimeOffset Date { get; set; }
        
    }
}