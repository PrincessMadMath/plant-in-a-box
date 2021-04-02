using System;

namespace Core.Models
{
    public class GroundHumidityDatapoint
    {
        public Guid DataPointId { get; set; }

        public Guid BoxId { get; set; }

        public float Humidity { get; set; }

        public DateTimeOffset Date { get; set; }
    }
}
