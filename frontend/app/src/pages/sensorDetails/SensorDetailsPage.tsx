import React from "react";
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
import { useGetHistory, useGetSensor } from "./hooks";
import { useParams } from "react-router-dom";

interface SensorDetailsPageProps {
    sensorId: string;
}

export const SensorDetailsPage = () => {
    let { sensorId } = useParams<SensorDetailsPageProps>();
    const { isLoading: isSensorLoading, data: sensor } = useGetSensor(sensorId);

    const { isLoading: isHistoryLoading, data: sensorHistory } =
        useGetHistory(sensorId);

    if (isSensorLoading || isHistoryLoading) {
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
                        <Text fontSize="md">{sensor!.name}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Type:
                        </Text>
                        <Text fontSize="md">{sensor!.type}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Location:
                        </Text>
                        <Text fontSize="md">{sensor!.location}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Plant Box:
                        </Text>
                        <Text fontSize="md">{sensor!.boxName}</Text>
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
                        <Text fontSize="md">{sensor!.lastData.value}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Last Update:
                        </Text>
                        <Text fontSize="md">{sensor!.lastData.date}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            State:
                        </Text>
                        <Text fontSize="md">{sensor!.status}</Text>
                    </Grid>
                </SimpleGrid>
            </Box>
            <Box>
                <DatedSeriesGraph
                    name="ground-humidity"
                    getValues={(minDate, maxDate) => {
                        return sensorHistory!
                            .map((d) => ({
                                date: new Date(d.date),
                                value: d.value,
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
