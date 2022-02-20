using Domain.IoT.Device;

namespace Domain.IoT.Actuators;

public interface IActuator
{
    public Guid Id { get; }

    public string Name { get; }

    public ActuatorType Type { get; }

    public ActuatorStatus Status { get; }

    public IReadOnlyCollection<DeviceLog> Logs { get; }
}