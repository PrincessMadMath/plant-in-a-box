using Core.Models;

namespace Data.GroundHumidity.MongoImpl
{
    public static class GroundHumidityDatapointDocumentUtils
    {
        public static GroundHumidityDatapoint ToModel(this GroundHumidityDatapointDocument document)
        {
            return new()
            {
                DataPointId = document.DataPointId,
                BoxId = document.BoxId,
                Humidity = document.Humidity,
                Date = document.Date,
            };
        }

        public static GroundHumidityDatapointDocument ToDocument(this GroundHumidityDatapoint document)
        {
            return new()
            {
                DataPointId = document.DataPointId,
                BoxId = document.BoxId,
                Humidity = document.Humidity,
                Date = document.Date,
            };
        }
    }
}
