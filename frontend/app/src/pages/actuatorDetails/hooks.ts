import { Actuator, getActuator } from "shared/api";

import { useQuery } from "react-query";

export function useGetActuator(actuatorId: string) {
    return useQuery<Actuator, any>(["actuator", actuatorId], () =>
        getActuator(actuatorId)
    );
}
