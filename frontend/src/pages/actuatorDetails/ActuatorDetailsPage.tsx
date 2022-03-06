import { Box, Center, Grid, Heading, Spinner } from "@chakra-ui/react";
import { ActuatorInfo } from "pages/actuatorDetails/ActuatorInfo";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetActuator, useGetActuatorsLogs } from "shared/api/actuators";
import { DeviceLogs } from "shared/components/deviceLogs";
import { GrowthLightControl } from "./GrowthLight/GrowthLightControl";

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
