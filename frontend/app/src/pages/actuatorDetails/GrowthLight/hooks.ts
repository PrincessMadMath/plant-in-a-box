import { getGrowthLightConfig } from "shared/api";

import { useMutation, useQuery } from "react-query";
import {
    ActuatorMutation,
    GrowthLightAutomatedSettings,
    GrowthLightManualSettings,
    setGrowthLightAutoSettings,
    setGrowthLightConfigMode,
    SetGrowthLightConfigModeMutation,
    setGrowthLightManualSettings,
} from "shared/api/actuators";
import { UseMutationOptions } from "react-query/types/react/types";

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
