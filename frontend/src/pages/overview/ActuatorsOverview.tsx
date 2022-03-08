import { Box, Center, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { ActuatorStatus, useGetActuators } from "shared/api";
import { formatFrom } from "shared/utils";

export const ActuatorsOverview = () => {
    const history = useHistory();

    const { isLoading: isActuatorsLoading, data: actuators } = useGetActuators();

    if (isActuatorsLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!actuators || actuators.length === 0) {
        return (
            <Box mt="8">
                <Heading as="h2" size="md">
                    Actuators (none registered)
                </Heading>
            </Box>
        );
    }

    return (
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
                    </Tr>
                </Thead>
                <Tbody>
                    {actuators?.map((x) => (
                        <Tr
                            key={x.id}
                            onClick={() => {
                                history.push(`/actuator/${x.id}`);
                            }}
                        >
                            <Td>{x.name}</Td>
                            <Td>{x.type}</Td>
                            <Td>{x.state}</Td>
                            <Td>{x.status === ActuatorStatus.Degraded ? x.errorMessage : x.status}</Td>
                            <Td>{formatFrom(x.lastUpdate)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
