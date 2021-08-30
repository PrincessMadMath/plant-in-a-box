import { fakeActuatorsList } from "./actuators.fake";
import { getJson } from "../utils";
import { Actuator } from "./models";

export const getActuatorsList = (): Promise<Actuator[]> => {
    return getJson<Actuator[]>(`actuators`, fakeActuatorsList);
};

export const getActuator = (actuatorId: string): Promise<Actuator> => {
    return getJson<Actuator>(
        `actuators/${actuatorId}`,
        fakeActuatorsList.find((x) => x.id === actuatorId)!
    );
};
