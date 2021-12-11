namespace Domain.Actuators.Light;

public class GrowthLightConfig
{
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
    public TimeOnly SunriseTime { get; set; }

    public TimeOnly SunsetTime { get; set; }
}

public class GrowthLightManualSettings
{
    public bool IsOn { get; set; }        
}