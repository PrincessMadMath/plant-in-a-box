using Domain.Actuators.Light;

namespace Domain.Actuators.GrowthLight;

public class GrowthLightActuator : IActuator
{
    public GrowthLightActuator(Guid id, string name, ActuatorStatus status, GrowthLightState state, GrowthLightConfig config)
    {
        Id = id;
        Name = name;
        Status = status;
        State = state;
        Config = config;
    }

    public Guid Id { get; }
    
    public string Name { get; }

    public ActuatorType Type => ActuatorType.GrowthLight;

    public GrowthLightState State { get; set; }
    
    public ActuatorStatus Status { get; }

    public GrowthLightConfig Config { get; set; }


    public enum GrowthLightState
    {
        Unknown = 0,
        Off = 1,
        On = 2,
    }
}