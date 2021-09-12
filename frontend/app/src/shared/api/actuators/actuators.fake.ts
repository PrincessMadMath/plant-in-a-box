import { ActuatorState, ActuatorStatus, ActuatorType } from "./models";
import { LogLevel } from "shared/api/device";
import dayjs from "dayjs";

export const fakeActuatorsList = [
    {
        id: "9dcdce7e-7420-4f63-a9fd-f005fd62b5bd",
        name: "Growt light 1",
        type: ActuatorType.GrowthLight,
        state: ActuatorState.On,
        status: ActuatorStatus.Healthy,
        lastUpdate: dayjs().subtract(1, "minute").toISOString(),
    },
    {
        id: "dd8ff917-6ede-4df9-9769-18219d5e69181",
        name: "Sprinkler 1",
        type: ActuatorType.Sprinkler,
        state: ActuatorState.Off,
        status: ActuatorStatus.Degraded,
        errorMessage: "Missing Water",
        lastUpdate: dayjs().subtract(20, "minute").toISOString(),
    },
];

export const fakeActuatorLogs = [
    {
        date: dayjs().subtract(1, "minute").toISOString(),
        level: LogLevel.Info,
        message: "Data lost",
    },
    {
        date: dayjs().subtract(1, "hour").toISOString(),
        level: LogLevel.Verbose,
        message: "Data received",
    },
    {
        date: dayjs().subtract(2, "hour").toISOString(),
        level: LogLevel.Error,
        message: "Connection error detected",
    },
    {
        date: dayjs().subtract(4, "hour").toISOString(),
        level: LogLevel.Verbose,
        message: "Data received",
    },
    {
        date: dayjs().subtract(2, "day").toISOString(),
        level: LogLevel.Verbose,
        message: "Data received",
    },
    {
        date: dayjs().subtract(1, "week").toISOString(),
        level: LogLevel.Warning,
        message: "Sensor connected",
    },
];
