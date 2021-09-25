import { getGrowthLightConfig, GrowthLightConfig } from "shared/api";

import { useMutation, useQuery, UseQueryOptions } from "react-query";
import {
    ActuatorMode,
    ActuatorMutation,
    GrowthLightAutomaticSettings,
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
    options?: UseMutationOptions<void, Error, ActuatorMutation<GrowthLightAutomaticSettings>>
) {
    return useMutation<void, Error, ActuatorMutation<GrowthLightAutomaticSettings>>(
        (mutation) => setGrowthLightAutoSettings(mutation),
        options
    );
}
