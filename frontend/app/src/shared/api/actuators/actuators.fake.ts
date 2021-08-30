import { ActuatorState, ActuatorStatus, ActuatorType } from "./models";

export const fakeActuatorsList = [
    {
        id: "9dcdce7e-7420-4f63-a9fd-f005fd62b5bd",
        type: ActuatorType.GrowthLight,
        state: ActuatorState.On,
        status: ActuatorStatus.Healthy,
        lastUpdate: "30 mins ago",
        location: "Montreal House",
        boxName: "Mint Box",
    },
    {
        id: "dd8ff917-6ede-4df9-9769-18219d5e69181",
        type: ActuatorType.Sprinkler,
        state: ActuatorState.Off,
        status: ActuatorStatus.Degraded,
        errorMessage: "Missing Water",
        lastUpdate: "30 mins ago",
        location: "Montreal House",
        boxName: "Mint Box",
    },
];
