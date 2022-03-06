import { Box, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Sensor } from "shared/api/sensors";

interface SensorDetailsProps {
    sensor: Sensor;
}

export const SensorInfo = ({ sensor }: SensorDetailsProps) => {
    return (
        <Box bg="gray.500" p="6" w="2xl">
            <SimpleGrid columns={2}>
                <Grid
                    templateColumns="max-content 1fr"
                    columnGap={6}
                    rowGap={2}
                    alignContent="start"
                    alignItems="center"
                >
                    <Text fontSize="md" fontWeight="bold">
                        Name:
                    </Text>
                    <Text fontSize="md">{sensor!.name}</Text>
                    <Text fontSize="md" fontWeight="bold">
                        Type:
                    </Text>
                    <Text fontSize="md">{sensor!.type}</Text>
                    <Text fontSize="md" fontWeight="bold">
                        Id:
                    </Text>
                    <Text fontSize="md">{sensor!.id}</Text>
                </Grid>
                <Grid
                    templateColumns="max-content 1fr"
                    columnGap={6}
                    rowGap={2}
                    alignContent="start"
                    alignItems="center"
                >
                    <Text fontSize="md" fontWeight="bold">
                        State:
                    </Text>
                    <Text fontSize="md">{sensor!.status}</Text>
                </Grid>
            </SimpleGrid>
        </Box>
    );
};
