export interface Sensor {
    id: string;
    name: string;
    type: SensorType;
    status: SensorStatus;
    lastData: SensorData;
    location: string;
    boxName: string;
}

export interface SensorData {
    date: string;
    value: number;
}

export enum SensorType {
    SoilMoisture = "SOIL_MOISTURE",
    SoilTemperature = "SOIL_TEMPERATURE",
    BoxHumidity = "BOX_HUMIDITY",
}

export enum SensorStatus {
    Offline = "OFFLINE",
    Active = "ACTIVE",
}

export enum DataUnitType {
    Percentage = "PERCENTAGE",
    Celcius = "CELCIUS",
    Number = "NUMBER",
}
