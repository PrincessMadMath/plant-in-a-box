namespace Domain.Actuators.Light;

public class GrowthLightActuator : IActuator
{
    public GrowthLightActuator(Guid id, string name, ActuatorStatus status)
    {
        Id = id;
        Name = name;
        Status = status;
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