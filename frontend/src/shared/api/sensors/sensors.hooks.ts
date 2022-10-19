import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeviceLog, SensorData } from "../index";
import { Sensor } from "./models";
import { generateFakeSensors, getSensor, getSensorHistory, getSensorLogs, getSensorsList } from "./sensors.api";

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

export function useCreateSensors() {
    const queryClient = useQueryClient();

    return useMutation((mutation) => generateFakeSensors(), {
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries(["sensor"]);
        },
    });
}
