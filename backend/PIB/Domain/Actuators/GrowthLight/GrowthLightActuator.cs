using Domain.Actuators.Light;
using Domain.Device;

namespace Domain.Actuators.GrowthLight;

public class GrowthLightActuator : IActuator
{
    public GrowthLightActuator(Guid id, string name, ActuatorStatus status, GrowthLightState state, GrowthLightConfig config, IReadOnlyCollection<DeviceLog> logs)
    {
        Id = id;
        Name = name;
        Status = status;
        State = state;
        Config = config;
        Logs = logs;
    }

    public Guid Id { get; }
    
    public string Name { get; }

    public ActuatorType Type => ActuatorType.GrowthLight;

    public GrowthLightState State { get; }
    
    public ActuatorStatus Status { get; }

    public GrowthLightConfig Config { get; }
    
    public IReadOnlyCollection<DeviceLog> Logs { get; }

    public enum GrowthLightState
    {
        Unknown = 0,
        Off = 1,
        On = 2,
    }
}