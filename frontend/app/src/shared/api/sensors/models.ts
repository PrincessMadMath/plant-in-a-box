export enum SensorType {
    SoilMoisture = "SOIL_MOISTURE",
    SoilTemperature = "SOIL_TEMPERATURE",
    BoxHumidity = "BOX_HUMIDITY",
}

export enum SensorStatus {
    Offline = "OFFLINE",
    Active = "ACTIVE",
}

export interface Sensor {
    id: string;
    name: string;
    type: SensorType;
    status: SensorStatus;
    lastData: SensorData;
}

export interface SensorData {
    date: string;
    value: number;
}

export enum DataUnitType {
    Percentage = "PERCENTAGE",
    Celsius = "CELSIUS",
    Number = "NUMBER",
}
