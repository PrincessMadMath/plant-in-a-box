import React, { useEffect, useState } from "react";
import {
    getGroundHumidityTest,
    getSensorOverviewTest,
    GroundHumidityData,
    SensorsOverview,
} from "shared/services/box-data";
import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Spinner,
    Text,
    Grid,
} from "@chakra-ui/react";
import { DatedSeriesGraph } from "shared/components/Graph/SeriesGraph";

interface SensorDetailsPageProps {
    sensorId: string;
}

export const SensorDetailsPage = ({ sensorId }: SensorDetailsPageProps) => {
    const [sensor, setSensor] = useState<SensorsOverview | null>(null);

    const [groundHumidityData, setGroundHumidityData] = useState<
        GroundHumidityData[]
    >([]);

    useEffect(() => {
        getSensorOverviewTest("88b2f49e-1226-4964-9aa9-9b1f8442fd36").then(
            (x) => {
                setSensor(x);
            }
        );
    }, []);

    useEffect(() => {
        getGroundHumidityTest("88b2f49e-1226-4964-9aa9-9b1f8442fd36").then(
            (x) => {
                setGroundHumidityData(x);
            }
        );
    }, []);

    if (sensor === null) {
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
                <Heading as="h1">{sensor.name} Details</Heading>
            </Center>
            <Heading as="h2">Details</Heading>
            <Box bg="gray.500" p="6" mt="3" w="2xl">
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
                        <Text fontSize="md">{sensor.name}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Type:
                        </Text>
                        <Text fontSize="md">{sensor.type}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Location:
                        </Text>
                        <Text fontSize="md">{sensor.location}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Plant Box:
                        </Text>
                        <Text fontSize="md">{sensor.boxName}</Text>
                    </Grid>
                    <Grid
                        templateColumns="max-content 1fr"
                        columnGap={6}
                        rowGap={2}
                        alignContent="start"
                        alignItems="center"
                    >
                        <Text fontSize="md" fontWeight="bold">
                            Value:
                        </Text>
                        <Text fontSize="md">{sensor.value}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Last Update:
                        </Text>
                        <Text fontSize="md">{sensor.lastUpdate}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            State:
                        </Text>
                        <Text fontSize="md">{sensor.state}</Text>
                    </Grid>
                </SimpleGrid>
            </Box>
            <Box>
                <DatedSeriesGraph
                    name="ground-humidity"
                    getValues={(minDate, maxDate) => {
                        return groundHumidityData
                            .map((d) => ({
                                date: new Date(d.date),
                                value: d.humidity,
                            }))
                            .filter(
                                (x) =>
                                    true ||
                                    (x.date >= minDate && x.date <= maxDate)
                            );
                    }}
                />
            </Box>
        </Box>
    );
};
