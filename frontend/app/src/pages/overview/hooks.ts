import { Actuator, getActuatorsList, getSensorsList, Sensor } from "shared/api";

import { useQuery } from "react-query";

export function useGetSensors() {
    return useQuery<Sensor[], any>("get-sensors-list", getSensorsList);
}

export function useGetActuators() {
    return useQuery<Actuator[], any>("get-actuators-list", getActuatorsList);
}
