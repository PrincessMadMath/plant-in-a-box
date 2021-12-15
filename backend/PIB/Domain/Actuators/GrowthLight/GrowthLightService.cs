using Domain.Actuators.Light;

namespace Domain.Actuators.GrowthLight;

public class GrowthLightService
{
    private readonly Dictionary<Guid, GrowthLightActuator> _actuators = new();
    
    public void RegisterActuator(GrowthLightActuator actuator)
    {
        if (this._actuators.ContainsKey(actuator.Id))
        {
            throw new ArgumentException("Actuator already exist.");
        }
        
        _actuators.Add(actuator.Id, actuator);
    }
    
    public IReadOnlyList<IActuator> GetActuators()
    {
        return this._actuators.Values.ToList();
    }

    public IActuator GetActuator(Guid actuatorId)
    {
        if (!this._actuators.TryGetValue(actuatorId, out var actuator))
        {
            throw new ArgumentException("Actuator does not exist.");
        }
        
        return actuator;
    }

    public GrowthLightConfig GetConfig(Guid actuatorId)
    {
        if (!this._actuators.TryGetValue(actuatorId, out var actuator))
        {
            throw new ArgumentException("Actuator does not exist.");
        }
        
        return actuator.Config;
    }

    public void SetMode(Guid actuatorId, GrowthLightSettingMode mode)
    {
        if (!this._actuators.TryGetValue(actuatorId, out var actuator))
        {
            throw new ArgumentException("Actuator does not exist.");
        }

        actuator.Config.Mode = mode;
    }

    public void SetManualSettings(Guid actuatorId, GrowthLightManualSettings manualSettings)
    {
        if (!this._actuators.TryGetValue(actuatorId, out var actuator))
        {
            throw new ArgumentException("Actuator does not exist.");
        }
        
        actuator.Config.ManualSettings = manualSettings;
    }

    public void SetAutomatedSettings(Guid actuatorId, GrowthLightAutomatedSettings automatedSettings)
    {
        if (!this._actuators.TryGetValue(actuatorId, out var actuator))
        {
            throw new ArgumentException("Actuator does not exist.");
        }
        
        actuator.Config.AutomatedSettings = automatedSettings;
    }
}