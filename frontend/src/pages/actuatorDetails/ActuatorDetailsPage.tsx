import React from "react";
import { Box, Center, Heading, Spinner, Grid } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { DeviceLogs } from "shared/components/deviceLogs";
import { ActuatorInfo } from "pages/actuatorDetails/ActuatorInfo";
import { GrowthLightControl } from "./GrowthLight/GrowthLightControl";
import {useGetActuator, useGetActuatorsLogs} from "shared/api/actuators";

interface ActuatorDetailsPageProps {
    actuatorId: string;
}

export const ActuatorDetailsPage = () => {
    let { actuatorId } = useParams<ActuatorDetailsPageProps>();
    const { isLoading: isActuatorLoading, data: actuator } = useGetActuator(actuatorId);
    const { isLoading: isLogsLoading, data: sensorLogs } = useGetActuatorsLogs(actuatorId);

    if (isActuatorLoading || isLogsLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    return (
        <Box mt="8">
            <Center>
                <Heading as="h1">{actuator!.name} Details</Heading>
            </Center>
            <Heading as="h2">Details</Heading>
            <Grid templateColumns={"max-content 1fr"} gap={6}>
                <ActuatorInfo actuator={actuator!} />
                <GrowthLightControl actuator={actuator!} />
            </Grid>
            <Box mt={12}>
                <Heading as="h2" size="lg" mb={4}>
                    Logs
                </Heading>
                <DeviceLogs sensorLogs={sensorLogs!} />
            </Box>
        </Box>
    );
};
