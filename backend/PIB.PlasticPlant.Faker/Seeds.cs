using Domain.IoT.Actuators;
using Domain.IoT.Actuators.GrowthLight;
using Domain.IoT.Device;

namespace PIB.PlasticPlant.Faker;

public static class Seeds
{
    public static IReadOnlyList<GrowthLightActuator> growthLightSeeds = new[]
    {
        new GrowthLightActuator(
            Guid.NewGuid(),
            "Light 1",
            ActuatorStatus.Online,
            GrowthLightActuator.GrowthLightState.On,
            new GrowthLightConfig(GrowthLightSettingMode.Automated,
                new GrowthLightAutomatedSettings(TimeSpan.FromHours(8),
                    TimeSpan.FromHours(18)),
                new GrowthLightManualSettings(true)),
            GenerateLogs()
        ),
        new GrowthLightActuator(
            Guid.NewGuid(),
            "Light 2",
            ActuatorStatus.Online,
            GrowthLightActuator.GrowthLightState.Off,
            new GrowthLightConfig(GrowthLightSettingMode.Manual,
                new GrowthLightAutomatedSettings(TimeSpan.FromHours(8),
                    TimeSpan.FromHours(18)),
                new GrowthLightManualSettings(true)),
            GenerateLogs()
        ),
        new GrowthLightActuator(
            Guid.NewGuid(),
            "Broken Light",
            ActuatorStatus.Degraded,
            GrowthLightActuator.GrowthLightState.Unknown,
            new GrowthLightConfig(GrowthLightSettingMode.Manual,
                new GrowthLightAutomatedSettings(TimeSpan.FromHours(8),
                    TimeSpan.FromHours(18)),
                new GrowthLightManualSettings(true)),
            GenerateLogs()
        ),
        new GrowthLightActuator(
            Guid.NewGuid(),
            "Legacy Light",
            ActuatorStatus.Offline,
            GrowthLightActuator.GrowthLightState.Off,
            new GrowthLightConfig(GrowthLightSettingMode.Manual,
                new GrowthLightAutomatedSettings(TimeSpan.FromHours(8),
                    TimeSpan.FromHours(18)),
                new GrowthLightManualSettings(true)),
            GenerateLogs()
        ),
    };

    private static IReadOnlyCollection<DeviceLog> GenerateLogs()
    {
        return new List<DeviceLog>()
        {
            new DeviceLog()
            {
                Date = DateTimeOffset.UtcNow.AddMinutes(-1),
                Level = DeviceLog.LogLevel.Info,
                Message = "Data lost",
            },
            new DeviceLog()
            {
                Date = DateTimeOffset.UtcNow.AddHours(-1),
                Level = DeviceLog.LogLevel.Verbose,
                Message = "Data received",
            },
            new DeviceLog()
            {
                Date = DateTimeOffset.UtcNow.AddHours(-2),
                Level = DeviceLog.LogLevel.Error,
                Message = "Connection error detected",
            },
            new DeviceLog()
            {
                Date = DateTimeOffset.UtcNow.AddHours(-4),
                Level = DeviceLog.LogLevel.Verbose,
                Message = "Data received",
            },
            new DeviceLog()
            {
                Date = DateTimeOffset.UtcNow.AddDays(-1),
                Level = DeviceLog.LogLevel.Verbose,
                Message = "Data received",
            },
            new DeviceLog()
            {
                Date = DateTimeOffset.UtcNow.AddDays(-7),
                Level = DeviceLog.LogLevel.Warning,
                Message = "Sensor connected",
            },
        };
    }
}