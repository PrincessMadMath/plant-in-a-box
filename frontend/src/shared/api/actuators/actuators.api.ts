import { getJson, postJson } from "../utils";
import {
    Actuator,
    ActuatorMode,
    GrowthLightAutomatedSettings,
    GrowthLightConfig,
    GrowthLightManualSettings,
} from "./models";
import { DeviceLog } from "shared/api/device";

export const getActuatorsList = (): Promise<Actuator[]> => {
    return getJson<Actuator[]>(`actuators`);
};

export const getActuator = (actuatorId: string): Promise<Actuator> => {
    return getJson<Actuator>(`actuators/${actuatorId}`);
};

export const getActuatorLogs = (actuatorId: string): Promise<DeviceLog[]> => {
    return getJson<DeviceLog[]>(`actuators/${actuatorId}/logs`);
};

export const getGrowthLightConfig = (actuatorId: string): Promise<GrowthLightConfig> => {
    return getJson<GrowthLightConfig>(`growth-light/${actuatorId}/config`);
};

export const setGrowthLightConfigMode = (
    modeMutation: ActuatorMutation<SetGrowthLightConfigModeMutation>
): Promise<any> => {
    return postJson(`growth-light/${modeMutation.actuatorId}/config/mode`, modeMutation.data);
};

export const setGrowthLightManualSettings = (
    modeMutation: ActuatorMutation<GrowthLightManualSettings>
): Promise<any> => {
    return postJson(`growth-light/${modeMutation.actuatorId}/config/manual`, modeMutation.data);
};

export const setGrowthLightAutoSettings = (
    modeMutation: ActuatorMutation<GrowthLightAutomatedSettings>
): Promise<any> => {
    return postJson(`growth-light/${modeMutation.actuatorId}/config/automated`, modeMutation.data);
};

export interface ActuatorMutation<T> {
    actuatorId: string;
    data: T;
}

export interface SetGrowthLightConfigModeMutation {
    mode: ActuatorMode;
}
