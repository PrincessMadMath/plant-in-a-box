export interface Actuator {
    id: string;
    name: string;
    type: ActuatorType;
    state: ActuatorState;
    status: ActuatorStatus;
    errorMessage?: string;
    lastUpdate: string;
}

export interface GrowthLightConfig {
    mode: ActuatorMode;
    manualSettings: GrowthLightManualSettings;
    automaticSettings: GrowthLightAutomaticSettings;
}

export interface GrowthLightManualSettings {
    isOn: boolean;
}

export interface GrowthLightAutomaticSettings {
    sunriseTime: string;
    sunsetTime: string;
}

export enum ActuatorType {
    GrowthLight = "GROWTH_LIGHT",
    Sprinkler = "SPRINKLER",
    Fan = "FAN",
}

export enum ActuatorStatus {
    Offline = "OFFLINE",
    Healthy = "HEALTHY",
    Degraded = "DEGRADED",
}

export enum ActuatorState {
    Unknown = "UNKNOWN",
    Off = "OFF",
    On = "ON",
}

export enum ActuatorMode {
    Manual = "MANUAL",
    Automatic = "AUTOMATIC",
}
