using Domain.Actuators;
using Domain.Actuators.GrowthLight;
using Domain.Actuators.Light;

namespace PlasticPlant.Faker;

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
                new GrowthLightManualSettings(true))
        ),
        new GrowthLightActuator(
            Guid.NewGuid(),
            "Light 2",
            ActuatorStatus.Online,
            GrowthLightActuator.GrowthLightState.Off,
            new GrowthLightConfig(GrowthLightSettingMode.Manual,
                new GrowthLightAutomatedSettings(TimeSpan.FromHours(8),
                    TimeSpan.FromHours(18)),
                new GrowthLightManualSettings(true))
        ),
        new GrowthLightActuator(
            Guid.NewGuid(),
            "Broken Light",
            ActuatorStatus.Degraded,
            GrowthLightActuator.GrowthLightState.Unknown,
            new GrowthLightConfig(GrowthLightSettingMode.Manual,
                new GrowthLightAutomatedSettings(TimeSpan.FromHours(8),
                    TimeSpan.FromHours(18)),
                new GrowthLightManualSettings(true))
        ),
        new GrowthLightActuator(
            Guid.NewGuid(),
            "Legacy Light",
            ActuatorStatus.Offline,
            GrowthLightActuator.GrowthLightState.Off,
            new GrowthLightConfig(GrowthLightSettingMode.Manual,
                new GrowthLightAutomatedSettings(TimeSpan.FromHours(8),
                    TimeSpan.FromHours(18)),
                new GrowthLightManualSettings(true))
        ),
    };
}