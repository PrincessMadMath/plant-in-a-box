import { fakeActuatorLogs, fakeActuatorsList } from "./actuators.fake";
import { getJson } from "../utils";
import { Actuator } from "./models";
import { DeviceLog } from "shared/api/device";

export const getActuatorsList = (): Promise<Actuator[]> => {
    return getJson<Actuator[]>(`actuators`, fakeActuatorsList);
};

export const getActuator = (actuatorId: string): Promise<Actuator> => {
    return getJson<Actuator>(`actuators/${actuatorId}`, fakeActuatorsList.find((x) => x.id === actuatorId)!);
};

export const getActuatorLogs = (actuatorId: string): Promise<DeviceLog[]> => {
    return getJson<DeviceLog[]>(`actuators/${actuatorId}/logs`, fakeActuatorLogs);
};
