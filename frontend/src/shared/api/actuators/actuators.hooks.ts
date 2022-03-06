import { useMutation, useQuery } from "react-query";
import { UseMutationOptions } from "react-query/types/react/types";
import {
    ActuatorMutation,
    getActuator,
    getActuatorLogs,
    getActuatorsList,
    getGrowthLightConfig,
    setGrowthLightAutoSettings,
    setGrowthLightConfigMode,
    SetGrowthLightConfigModeMutation,
    setGrowthLightManualSettings,
} from "./actuators.api";
import { Actuator, GrowthLightAutomatedSettings, GrowthLightManualSettings } from "./models";
import { DeviceLog } from "../device";

export function useGetActuators() {
    return useQuery<Actuator[], any>("actuators", getActuatorsList);
}

export function useGetActuator(actuatorId: string) {
    return useQuery<Actuator, any>(["actuator", actuatorId], () => getActuator(actuatorId));
}

export function useGetGrowthLightConfig(actuatorId: string) {
    return useQuery(["actuator", "config", actuatorId], () => getGrowthLightConfig(actuatorId));
}

export function invalidateGrowthLightConfig(queryClient: any, actuatorId: string) {
    queryClient.invalidateQueries(["actuator", "config", actuatorId]);
}

export function useSetGrowthLightMode(
    options?: UseMutationOptions<void, Error, ActuatorMutation<SetGrowthLightConfigModeMutation>>
) {
    return useMutation<void, Error, ActuatorMutation<SetGrowthLightConfigModeMutation>>(
        (mutation) => setGrowthLightConfigMode(mutation),
        options
    );
}

export function useSetGrowthLightManualSettings(
    options?: UseMutationOptions<void, Error, ActuatorMutation<GrowthLightManualSettings>>
) {
    return useMutation<void, Error, ActuatorMutation<GrowthLightManualSettings>>(
        (mutation) => setGrowthLightManualSettings(mutation),
        options
    );
}

export function useSetGrowthLightAutoSettings(
    options?: UseMutationOptions<void, Error, ActuatorMutation<GrowthLightAutomatedSettings>>
) {
    return useMutation<void, Error, ActuatorMutation<GrowthLightAutomatedSettings>>(
        (mutation) => setGrowthLightAutoSettings(mutation),
        options
    );
}

export function useGetActuatorsLogs(actuatorId: string) {
    return useQuery<DeviceLog[], any>(["actuator", "logs", actuatorId], () => getActuatorLogs(actuatorId));
}
