import { DeviceLog } from "shared/api/device";
import { getJsonAxios, postJsonAxios } from "../utils";
import { Sensor, SensorData } from "./models";

export const getSensorsList = (): Promise<Sensor[]> => {
    return getJsonAxios<Sensor[]>(`sensors`);
};

export const getSensor = (sensorId: string): Promise<Sensor> => {
    return getJsonAxios<Sensor>(`sensors/${sensorId}`);
};

export const getSensorHistory = (sensorId: string): Promise<SensorData[]> => {
    return getJsonAxios<SensorData[]>(`sensors/${sensorId}/data`);
};

export const getSensorLogs = (sensorId: string): Promise<DeviceLog[]> => {
    return getJsonAxios<DeviceLog[]>(`sensors/${sensorId}/logs`);
};

export const generateFakeSensors = (): Promise<Sensor[]> => {
    return postJsonAxios(`sensors/generate`, "");
};
