import { Box, Center, Grid, Heading, Spinner, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { SensorHistory } from "pages/sensors/sensorDetails/SensorHistory";
import { SensorInfo } from "pages/sensors/sensorDetails/SensorInfo";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetHistory, useGetSensor, useGetSensorLogs } from "shared/api/sensors";
import { DeviceLogs } from "shared/components/deviceLogs";
import { formatFrom } from "shared/utils";

interface SensorDetailsPageProps {
    sensorId: string;
}

export const SensorDetailsPage = () => {
    let { sensorId } = useParams<SensorDetailsPageProps>();

    const { isLoading: isSensorLoading, data: sensor } = useGetSensor(sensorId);
    const { isLoading: isHistoryLoading, data: sensorHistory } = useGetHistory(sensorId);
    const { isLoading: isLogsLoading, data: sensorLogs } = useGetSensorLogs(sensorId);

    if (isSensorLoading || isHistoryLoading || isLogsLoading) {
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
                <Heading as="h1">{sensor!.name} Details</Heading>
            </Center>
            <Box mt="6">
                <Heading as="h2" size="lg" mb={3}>
                    Details
                </Heading>
                <Grid templateColumns={"max-content 1fr"} gap={6}>
                    <Box>
                        <Stat display="flex" justifyContent="center">
                            <StatLabel>Current Value</StatLabel>
                            <StatNumber>{sensor!.lastData?.value}</StatNumber>
                            <StatHelpText>{formatFrom(sensor!.lastData?.date)}</StatHelpText>
                        </Stat>
                        <Box mt="3">
                            <SensorInfo sensor={sensor!} />
                        </Box>
                    </Box>
                    <Box>
                        <SensorHistory sensorHistory={sensorHistory!} />
                    </Box>
                </Grid>
            </Box>
            <Box mt={12}>
                <Heading as="h2" size="lg" mb={4}>
                    Logs
                </Heading>
                <DeviceLogs sensorLogs={sensorLogs!} />
            </Box>
        </Box>
    );
};
