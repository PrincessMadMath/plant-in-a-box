import { useQuery } from "react-query";
import { Sensor } from "./models";
import { getSensor, getSensorHistory, getSensorLogs, getSensorsList } from "./sensors.api";
import { DeviceLog, SensorData } from "../index";

export function useGetSensors() {
    return useQuery<Sensor[], any>("sensors", getSensorsList);
}

export function useGetSensor(sensorId: string) {
    return useQuery<Sensor, any>(["sensor", sensorId], () => getSensor(sensorId));
}

export function useGetHistory(sensorId: string) {
    return useQuery<SensorData[], any>(["sensor", "history", sensorId], () => getSensorHistory(sensorId));
}

export function useGetSensorLogs(sensorId: string) {
    return useQuery<DeviceLog[], any>(["sensor", "logs", sensorId], () => getSensorLogs(sensorId));
}
