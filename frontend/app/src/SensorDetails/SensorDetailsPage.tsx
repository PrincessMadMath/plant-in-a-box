import React, { useEffect, useState } from "react";
import {
    getGroundHumidity,
    getGroundHumidityTest,
    getSensorOverviewTest,
    GroundHumidityData,
    SensorsOverview,
} from "../services/box-data";
import { PointTooltipProps, ResponsiveLine } from "@nivo/line";
import moment from "moment";
import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Spinner,
    Text,
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
                <GroundHumidityGraph
                    id="ground-humidity"
                    data={groundHumidityData.map((d) => ({
                        x: new Date(d.date),
                        y: d.humidity,
                    }))}
                />
            </div>
        </Box>
    );
};

interface GroundHumidityGraphProps {
    id: string;
    data: DatePoint[];
}

interface DatePoint {
    x: Date;
    y: number;
}

const GroundHumidityGraph = ({ id, data }: GroundHumidityGraphProps) => {
    debugger;
    const nivoData = [
        {
            id,
            data,
        },
    ];

    const customTooltip = ({ point }: PointTooltipProps) => {
        return (
            <p
                style={{
                    background: "rgba(69,77,93,.9)",
                    borderRadius: 4,
                    padding: 8,
                }}
            >
                Time: <b>{point.data.xFormatted}</b>
                <br />
                Count: <b>{point.data.yFormatted}</b>
            </p>
        );
    };

    return (
        <div style={{ height: 300, background: "white" }}>
            <h3>Nivo Stacked Area Chart</h3>
            <ResponsiveLine
                data={nivoData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xFormat={(d) => moment(d).format()}
                xScale={{ type: "time", format: "native" }}
                yScale={{
                    type: "linear",
                    min: 0,
                }}
                curve="natural"
                axisBottom={{
                    format: "%Y-%m-%d ",
                    tickValues: "every day",
                    legend: "time",
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                tooltip={customTooltip}
                colors={{ scheme: "purpleRed_green" }}
                lineWidth={1}
                pointSize={4}
                enableArea={true}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 8,
                    },
                ]}
            />
        </div>
    );
};
