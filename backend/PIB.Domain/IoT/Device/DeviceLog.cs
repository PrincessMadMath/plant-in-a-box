namespace Domain.IoT.Device;

public class DeviceLog
{
    public DateTimeOffset Date { get; set; }
    public LogLevel Level { get; set; }
    public string Message { get; set; } = String.Empty;

    public enum LogLevel
    {
        Verbose = 0,
        Info = 1,
        Warning = 2,
        Error = 3,
    }
}
