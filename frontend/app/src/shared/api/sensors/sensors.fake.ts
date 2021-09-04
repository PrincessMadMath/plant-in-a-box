import { SensorStatus, SensorType } from "./models";

export const fakeSensorsList = [
    {
        id: "99cfe196-ccc6-440b-be47-650a297e58a5",
        name: "MTL_MINT_SOIL_1",
        type: SensorType.SoilMoisture,
        status: SensorStatus.Active,
        lastData: {
            value: 750,
            date: "30 mins ago",
        },
        location: "Montreal House",
        boxName: "Mint Box",
    },
    {
        id: "26f06c6c-049e-40ea-b768-dff4086b8713",
        name: "MTL_MINT_TEMP_1",
        type: SensorType.SoilTemperature,
        status: SensorStatus.Active,
        lastData: {
            value: 22,
            date: "30 mins ago",
        },
        location: "Montreal House",
        boxName: "Mint Box",
    },
    {
        id: "93c7d3dd-8738-4e5c-afef-52b3eae20569",
        name: "MTL_MINT_HUM_1",
        type: SensorType.BoxHumidity,
        status: SensorStatus.Active,
        lastData: {
            value: 0.2,
            date: "30 mins ago",
        },
        location: "Montreal House",
        boxName: "Mint Box",
    },
];

export const fakeSoilMoistureHistory = [
    {
        date: "2020-10-10T00:00:00",
        value: 10,
    },
    {
        date: "2020-10-10T10:00:00",
        value: 14,
    },
    {
        date: "2020-10-11T00:00:00",
        value: 12,
    },
    {
        date: "2020-10-11T10:00:00",
        value: 13,
    },
    {
        date: "2020-10-12T00:00:00",
        value: 8,
    },
    {
        date: "2020-10-12T10:00:00",
        value: 9,
    },
];
