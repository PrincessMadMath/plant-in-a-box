import { Box, Center, Spinner } from "@chakra-ui/react";
import { Select } from "@mantine/core";
import { SensorDetails } from "pages/sensors/sensorDetails/SensorDetailsPage";

import React from "react";
import { Plant, useGetSensors, useLinkWithSoilMoistureSensor } from "shared/api";

interface PlantPageProps {
    plant: Plant;
}

export const PlantSensors = ({ plant }: PlantPageProps) => {
    return (
        <Box>
            <ConnectSensor plantId={plant.plantId} sensorId={plant.soilMoistureSensorId} />
            <PlantSensorDetails sensorId={plant.soilMoistureSensorId} />
        </Box>
    );
};

interface ConnectSensorProps {
    plantId: string;
    sensorId?: string;
}

const ConnectSensor = ({ plantId, sensorId }: ConnectSensorProps) => {
    const { isLoading: isSensorsLoading, data: sensors } = useGetSensors();

    const linkWithSensor = useLinkWithSoilMoistureSensor();

    if (isSensorsLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    return (
        <Box mt="3">
            Linked Plant:
            <Select
                placeholder="Link"
                label="Link with a plant"
                searchable
                clearable
                value={sensorId}
                data={sensors?.map((x) => ({ label: x.name, value: x.id })) ?? []}
                onChange={(value) => {
                    if (!value) {
                        console.log("Unlink not supported");
                        return;
                    }

                    linkWithSensor.mutate({
                        plantId: plantId,
                        sensorId: value,
                    });
                }}
            />
        </Box>
    );
};

interface SensorDetailsProps {
    sensorId?: string;
}

const PlantSensorDetails = ({ sensorId }: SensorDetailsProps) => {
    if (!sensorId) {
        return <Box>No sensor linked.</Box>;
    }

    return <SensorDetails sensorId={sensorId} />;
};
