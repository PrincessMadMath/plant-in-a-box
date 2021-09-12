import { Actuator, getActuator } from "shared/api";

import { useQuery } from "react-query";
import { DeviceLog } from "shared/api/device";
import { getActuatorLogs } from "shared/api/actuators";

export function useGetActuator(actuatorId: string) {
    return useQuery<Actuator, any>(["actuator", actuatorId], () => getActuator(actuatorId));
}

export function useGetLogs(actuatorId: string) {
    return useQuery<DeviceLog[], any>(["sensor", "logs", actuatorId], () => getActuatorLogs(actuatorId));
}
