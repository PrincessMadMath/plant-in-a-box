using System;
using Core.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Data.GroundHumidity.MongoImpl
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

    public static class GroundHumidityDatapointDocumentUtils
    {
        public static GroundHumidityDatapoint ToModel(this GroundHumidityDatapointDocument document)
        {
            return new GroundHumidityDatapoint
            {
                DataPointId = document.DataPointId,
                BoxId = document.BoxId,
                Humidity = document.Humidity,
                Date = document.Date,
            };
        }
        
        public static GroundHumidityDatapointDocument ToDocument(this GroundHumidityDatapoint document)
        {
            return new GroundHumidityDatapointDocument
            {
                DataPointId = document.DataPointId,
                BoxId = document.BoxId,
                Humidity = document.Humidity,
                Date = document.Date,
            };
        }
    }
}