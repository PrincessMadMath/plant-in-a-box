using System;
using MongoDB.Bson;

namespace Api.BoxData.Model
{
    public class GroundHumidityDocument
    {
        public ObjectId Id { get; set; }
        
        public float Humidity { get; set; }
        
        public DateTimeOffset Date { get; set; }
        
    }
}