import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
    ActuatorsOverview,
    getActuatorsOverviewTest,
    getSensorsOverviewTest,
    SensorsOverview,
} from "shared/services/box-data";

import {
    Box,
    Center,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

export const OverviewPage = () => {
    const [sensors, setSensors] = useState<SensorsOverview[]>([]);
    const [actuators, setActuators] = useState<ActuatorsOverview[]>([]);

    const history = useHistory();

    useEffect(() => {
        getSensorsOverviewTest("88b2f49e-1226-4964-9aa9-9b1f8442fd36").then(
            (x) => {
                console.log(x);
                setSensors(x);
            }
        );

        getActuatorsOverviewTest("88b2f49e-1226-4964-9aa9-9b1f8442fd36").then(
            (x) => {
                setActuators(x);
            }
        );
    }, []);

    return (
        <Box mt="8">
            <Center>
                <Heading as="h1">Home Plants Center</Heading>
            </Center>
            <Box mt="8">
                <Heading as="h2" size="md">
                    Sensors
                </Heading>
                <Table variant="simple" mt="4">
                    <Thead>
                        <Tr>
                            <Th>Box Name</Th>
                            <Th>Types</Th>
                            <Th isNumeric>Value</Th>
                            <Th>State</Th>
                            <Th>Last Update</Th>
                            <Th>Location</Th>
                            <Th>Plant Box Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sensors.map((x) => (
                            <Tr
                                onClick={() => {
                                    history.push("/sensor");
                                }}
                            >
                                <Td>{x.boxName}</Td>
                                <Td>{x.type}</Td>
                                <Td isNumeric>{x.value}</Td>
                                <Td>{x.state}</Td>
                                <Td>{x.lastUpdate}</Td>
                                <Td>{x.location}</Td>
                                <Td>{x.boxName}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Box mt="6">
                <Heading as="h2" size="md">
                    Actuators
                </Heading>
                <Table variant="simple" mt="4">
                    <Thead>
                        <Tr>
                            <Th>Box Name</Th>
                            <Th>Types</Th>
                            <Th isNumeric>Value</Th>
                            <Th>State</Th>
                            <Th>Last Update</Th>
                            <Th>Location</Th>
                            <Th>Plant Box Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {actuators.map((x) => (
                            <Tr>
                                <Td>{x.boxName}</Td>
                                <Td>{x.type}</Td>
                                <Td isNumeric>{x.value}</Td>
                                <Td>{x.state}</Td>
                                <Td>{x.lastUpdate}</Td>
                                <Td>{x.location}</Td>
                                <Td>{x.boxName}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};
