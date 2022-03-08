import { DeviceLog } from "shared/api/device";
import { getJson } from "../utils";
import { Sensor, SensorData } from "./models";

export const getSensorsList = (): Promise<Sensor[]> => {
    return getJson<Sensor[]>(`sensors`);
};

export const getSensor = (sensorId: string): Promise<Sensor> => {
    return getJson<Sensor>(`sensors/${sensorId}`);
};

export const getSensorHistory = (sensorId: string): Promise<SensorData[]> => {
    return getJson<SensorData[]>(`sensors/${sensorId}/data`);
};

export const getSensorLogs = (sensorId: string): Promise<DeviceLog[]> => {
    return getJson<DeviceLog[]>(`sensors/${sensorId}/logs`);
};
