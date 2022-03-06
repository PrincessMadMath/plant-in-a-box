import React from "react";
import { Box, Center, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { formatFrom } from "../../shared/utils";
import { useGetSensors } from "shared/api";
import { useHistory } from "react-router-dom";

export const SensorsOverview = () => {
    const history = useHistory();

    const { isLoading: isSensorsLoading, data: sensors } = useGetSensors();

    if (isSensorsLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!sensors || sensors.length === 0) {
        return (
            <Box mt="8">
                <Heading as="h2" size="md">
                    Sensors (none registered)
                </Heading>
            </Box>
        );
    }

    return (
        <Box mt="8">
            <Heading as="h2" size="md">
                Sensors
            </Heading>
            <Table variant="simple" mt="4">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Types</Th>
                        <Th isNumeric>Value</Th>
                        <Th>Status</Th>
                        <Th>Last Update</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {sensors?.map((x) => (
                        <Tr
                            key={x.id}
                            onClick={() => {
                                history.push(`/sensor/${x.id}`);
                            }}
                        >
                            <Td>{x.name}</Td>
                            <Td>{x.type}</Td>
                            <Td isNumeric>{x.lastData.value}</Td>
                            <Td>{x.status}</Td>
                            <Td>{formatFrom(x.lastData.date)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
