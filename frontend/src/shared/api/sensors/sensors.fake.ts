import { SensorStatus, SensorType } from "./models";
import { LogLevel } from "shared/api/device";
import dayjs from "dayjs";

export const fakeSensorsList = [
    {
        id: "99cfe196-ccc6-440b-be47-650a297e58a5",
        name: "MTL_MINT_SOIL_1",
        type: SensorType.SoilMoisture,
        status: SensorStatus.Active,
        lastData: {
            value: 750,
            date: dayjs().subtract(20, "minute").toISOString(),
        },
    },
    {
        id: "26f06c6c-049e-40ea-b768-dff4086b8713",
        name: "MTL_MINT_TEMP_1",
        type: SensorType.SoilTemperature,
        status: SensorStatus.Active,
        lastData: {
            value: 22,
            date: dayjs().subtract(40, "minute").toISOString(),
        },
    },
    {
        id: "93c7d3dd-8738-4e5c-afef-52b3eae20569",
        name: "MTL_MINT_HUM_1",
        type: SensorType.BoxHumidity,
        status: SensorStatus.Active,
        lastData: {
            value: 0.2,
            date: dayjs().subtract(2, "minute").toISOString(),
        },
    },
];

export const fakeSoilMoistureHistory = Array.from({ length: 200 }, (_, index) => {
    return {
        date: dayjs().subtract(index, "hour").toISOString(),
        value: Math.random() * 20,
    };
});

export const fakeSensorLogs = [
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
        message: "Actuator connected",
    },
];
