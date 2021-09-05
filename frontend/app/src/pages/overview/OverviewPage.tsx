import React from "react";
import { useHistory } from "react-router-dom";

import { ActuatorStatus } from "shared/api";

import { Box, Center, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { useGetActuators, useGetSensors } from "./hooks";

export const OverviewPage = () => {
    const history = useHistory();

    const { isLoading: isSensorsLoading, data: sensors } = useGetSensors();

    const { isLoading: isActuatorsLoading, data: actuators } = useGetActuators();

    if (isSensorsLoading || isActuatorsLoading) {
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
                            <Th>Status</Th>
                            <Th>Last Update</Th>
                            <Th>Location</Th>
                            <Th>Plant Box Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sensors?.map((x) => (
                            <Tr
                                onClick={() => {
                                    history.push(`/sensor/${x.id}`);
                                }}
                            >
                                <Td>{x.boxName}</Td>
                                <Td>{x.type}</Td>
                                <Td isNumeric>{x.lastData.value}</Td>
                                <Td>{x.status}</Td>
                                <Td>{x.lastData.date}</Td>
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
                            <Th>State</Th>
                            <Th>Status</Th>
                            <Th>Last Update</Th>
                            <Th>Location</Th>
                            <Th>Plant Box Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {actuators?.map((x) => (
                            <Tr
                                onClick={() => {
                                    history.push(`/actuator/${x.id}`);
                                }}
                            >
                                <Td>{x.boxName}</Td>
                                <Td>{x.type}</Td>
                                <Td>{x.state}</Td>
                                <Td>{x.status === ActuatorStatus.Degraded ? x.errorMessage : x.status}</Td>
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
