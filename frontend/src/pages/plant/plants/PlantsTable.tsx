import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Plant } from "shared/api";
import { formatFrom } from "shared/utils";

interface PlantsTableProps {
    plants: Plant[];
}

export const PlantsTable = ({ plants }: PlantsTableProps) => {
    return (
        <Box mt="8">
            <Heading as="h2" size="md">
                Sensors
            </Heading>
            <Table variant="simple" mt="4">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Species</Th>
                        <Th>Acquisition Date</Th>
                        <Th>Room</Th>
                        <Th>Pot</Th>
                        <Th>Last Watered</Th>
                        <Th>Last Fertilized</Th>
                        <Th>Last Repot</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {plants.map((x) => (
                        <Tr key={x.plantId}>
                            <Td>{x.name}</Td>
                            <Td>{x.species}</Td>
                            <Td>{x.acquisitionDate}</Td>
                            <Td>{x.room}</Td>
                            <Td>{x.pot}</Td>
                            <Td>{formatOperationsDate(x.operations?.lastWateredDate)}</Td>
                            <Td>{formatOperationsDate(x.operations?.lastFertilizedDate)}</Td>
                            <Td>{formatOperationsDate(x.operations?.lastRepotDate)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

const formatOperationsDate = (date: string) => {
    if (date == null) {
        return "Never";
    }

    return formatFrom(date);
};
