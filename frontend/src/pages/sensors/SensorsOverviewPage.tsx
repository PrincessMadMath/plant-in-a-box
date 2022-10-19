import { Box, Button, Center, Heading, HStack, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGetSensors } from "shared/api";
import { useCreateSensors } from "shared/api/sensors";
import { formatFrom } from "shared/utils";

export const SensorsOverviewPage = () => {
    const history = useHistory();

    const { isLoading: isSensorsLoading, data: sensors } = useGetSensors();

    const generateSensors = useCreateSensors();

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
                <HStack justify={"space-between"}>
                    <Heading as="h2" size="md">
                        Sensors (none registered)
                    </Heading>
                    <Button onClick={() => generateSensors.mutate()}>Generate fake sensors</Button>
                </HStack>
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
                            <Td isNumeric>{x.lastData ? x.lastData.value : "null"}</Td>
                            <Td>{x.status}</Td>
                            <Td>{x.lastData ? formatFrom(x.lastData.date) : "null"}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
