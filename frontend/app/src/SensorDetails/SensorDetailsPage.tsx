import React, { useEffect, useState } from "react";
import {
    getGroundHumidity,
    getGroundHumidityTest,
    getSensorOverviewTest,
    GroundHumidityData,
    SensorsOverview,
} from "../services/box-data";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Spinner,
    VStack,
    Text,
    Container,
    Grid,
} from "@chakra-ui/react";

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
            <div>
                <GroundHumidityGraph values={groundHumidityData} />
            </div>
        </Box>
    );
};

interface GroundHumidityGraphProps {
    values: GroundHumidityData[];
}

const GroundHumidityGraph = ({ values }: GroundHumidityGraphProps) => {
    const formattedData = values.map((value) => {
        return {
            x: moment(value.date).format("YYYY-MM-D-H:m"),
            y: value.humidity,
        };
    });
    const data = [
        {
            id: "ground-humidity",
            color: "hsl(43, 70%, 50%)",
            data: formattedData,
        },
    ];

    return (
        <div style={{ height: 300 }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d-%H:%M",
                }}
                xFormat="time:%Y-%m-%d-%H:%M"
                yScale={{
                    type: "linear",
                    stacked: false,
                }}
                axisLeft={{
                    legend: "Humidity",
                    legendOffset: 12,
                }}
                axisBottom={{
                    format: "%b %d %H:%M",
                    legend: "time scale",
                    legendOffset: -12,
                    tickValues: "every 2 months",
                }}
                curve="monotoneX"
                pointSize={16}
                enablePointLabel={true}
                useMesh={true}
            />
        </div>
    );
};
