namespace Domain.Actuators.Light;

public class GrowthLightConfig
{
    public GrowthLightConfig(GrowthLightSettingMode mode, GrowthLightAutomatedSettings automatedSettings, GrowthLightManualSettings manualSettings)
    {
        this.Mode = mode;
        this.AutomatedSettings = automatedSettings;
        this.ManualSettings = manualSettings;
    }

    public GrowthLightSettingMode Mode { get; set; }
    
    public GrowthLightAutomatedSettings AutomatedSettings { get; set; }

    public GrowthLightManualSettings ManualSettings { get; set; }
}

public enum GrowthLightSettingMode
{
    Manual = 1,
    Automated = 2,
}


public class GrowthLightAutomatedSettings
{
    public GrowthLightAutomatedSettings(TimeSpan sunriseTime, TimeSpan sunsetTime)
    {
        this.SunriseTime = sunriseTime;
        this.SunsetTime = sunsetTime;
    }

    // TODO: Move to TimeOnly once supported in JsonSerializer
    public TimeSpan SunriseTime { get; set; }

    public TimeSpan SunsetTime { get; set; }
}

public class GrowthLightManualSettings
{
    public GrowthLightManualSettings(bool isOn)
    {
        this.IsOn = isOn;
    }

    public bool IsOn { get; set; }        
}