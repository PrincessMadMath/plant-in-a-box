import { Sensor, getSensor, getSensorHistory, SensorData } from "shared/api";

import { useQuery } from "react-query";

export function useGetSensor(sensorId: string) {
    return useQuery<Sensor, any>(["sensor", sensorId], () => getSensor(sensorId));
}

export function useGetHistory(sensorId: string) {
    return useQuery<SensorData[], any>(["sensor", "history", sensorId], () => getSensorHistory(sensorId));
}
