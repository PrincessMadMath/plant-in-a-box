import { config } from "./../core/config";

export const getGroundHumidity = (
    boxId: string
): Promise<GroundHumidityData[]> => {
    return fetch(`${config.api.url}/box-data/ground-humidity?boxId=${boxId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getGroundHumidityTest = (
    boxId: string
): Promise<GroundHumidityData[]> => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                date: "2020-10-10T00:00:00",
                humidity: 10,
            },
            {
                date: "2020-10-11T00:00:00",
                humidity: 12,
            },
            {
                date: "2020-10-12T00:00:00",
                humidity: 14,
            },
        ]);
    });
};

export const getSensorOverviewTest = (
    boxId: string
): Promise<SensorsOverview> => {
    return new Promise((resolve, reject) => {
        resolve({
            type: "Soil moisture",
            value: "20%",
            state: "Healthy",
            lastUpdate: "30 mins ago",
            location: "Montreal House",
            boxName: "Mint Box",
        });
    });
};

export const getSensorsOverviewTest = (
    boxId: string
): Promise<SensorsOverview[]> => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                type: "Soil moisture",
                value: "20%",
                state: "Healthy",
                lastUpdate: "30 mins ago",
                location: "Montreal House",
                boxName: "Mint Box",
            },
            {
                type: "Temperature",
                value: "20°C",
                state: "Healthy",
                lastUpdate: "30 mins ago",
                location: "Montreal House",
                boxName: "Mint Box",
            },
            {
                type: "Humidity",
                value: "20%",
                state: "Healthy",
                lastUpdate: "30 mins ago",
                location: "Montreal House",
                boxName: "Mint Box",
            },
        ]);
    });
};

export const getActuatorsOverviewTest = (
    boxId: string
): Promise<ActuatorsOverview[]> => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                type: "Growth Light",
                value: "On",
                state: "Healthy",
                lastUpdate: "30 mins ago",
                location: "Montreal House",
                boxName: "Mint Box",
            },
            {
                type: "Temperature",
                value: "20°C",
                state: "Missing Water",
                lastUpdate: "30 mins ago",
                location: "Montreal House",
                boxName: "Mint Box",
            },
        ]);
    });
};

export interface GroundHumidityData {
    humidity: number;
    date: string;
}

export interface SensorsOverview {
    type: string;
    value: string;
    state: string;
    lastUpdate: string;
    location: string;
    boxName: string;
}

export interface ActuatorsOverview {
    type: string;
    value: string;
    state: string;
    lastUpdate: string;
    location: string;
    boxName: string;
}
