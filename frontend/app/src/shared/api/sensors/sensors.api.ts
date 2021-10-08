import { fakeSoilMoistureHistory, fakeSensorsList, fakeSensorLogs } from "./sensors.fake";
import { getJson } from "../utils";
import { Sensor, SensorData } from "./models";
import { DeviceLog } from "shared/api/device";

export const getSensorsList = (): Promise<Sensor[]> => {
    return getJson<Sensor[]>(`sensors`, fakeSensorsList);
};

export const getSensor = (sensorId: string): Promise<Sensor> => {
    return getJson<Sensor>(`sensors/${sensorId}`, fakeSensorsList.find((x) => x.id === sensorId)!);
};

export const getSensorHistory = (sensorId: string): Promise<SensorData[]> => {
    return getJson<SensorData[]>(`sensors/${sensorId}/history`, fakeSoilMoistureHistory);
};

export const getSensorLogs = (sensorId: string): Promise<DeviceLog[]> => {
    return getJson<DeviceLog[]>(`sensors/${sensorId}/logs`, fakeSensorLogs);
};
