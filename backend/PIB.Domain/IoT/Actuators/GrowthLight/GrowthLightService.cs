using PIB.Domain.IoT.Device;

namespace PIB.Domain.IoT.Actuators.GrowthLight;

public class GrowthLightService
{
    private readonly Dictionary<Guid, GrowthLightActuator> _actuators = new();
    
    private readonly Dictionary<Guid, List<DeviceLog>> _logs = new();
    
    public void RegisterActuator(GrowthLightActuator actuator)
    {
        if (this._actuators.ContainsKey(actuator.Id))
        {
            throw new ArgumentException("Actuator already exist.");
        }

        this._actuators.Add(actuator.Id, actuator);
        // TODO: Split actuator from logs
        this._logs.Add(actuator.Id, actuator.Logs.ToList());
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
    
    public IReadOnlyCollection<DeviceLog> GetLogs(Guid actuatorId)
    {
        if (!this._logs.TryGetValue(actuatorId, out var logs))
        {
            return Array.Empty<DeviceLog>();
        }

        return logs;
    }
    
    public void AppendLog(Guid actuatorId, DeviceLog log)
    {
        if (!this._logs.TryGetValue(actuatorId, out var logs))
        {
            this._logs.Add(actuatorId, new List<DeviceLog>(){log});
            return;
        }

        logs.Add(log);
    }
}
