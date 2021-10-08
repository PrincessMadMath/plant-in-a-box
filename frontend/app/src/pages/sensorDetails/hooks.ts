import { Sensor, getSensor, getSensorHistory, SensorData } from "shared/api";

import { useQuery } from "react-query";
import { getSensorLogs } from "shared/api/sensors";
import { DeviceLog } from "shared/api/device";

export function useGetSensor(sensorId: string) {
    return useQuery<Sensor, any>(["sensor", sensorId], () => getSensor(sensorId));
}

export function useGetHistory(sensorId: string) {
    return useQuery<SensorData[], any>(["sensor", "history", sensorId], () => getSensorHistory(sensorId));
}

export function useGetLogs(sensorId: string) {
    return useQuery<DeviceLog[], any>(["sensor", "logs", sensorId], () => getSensorLogs(sensorId));
}
