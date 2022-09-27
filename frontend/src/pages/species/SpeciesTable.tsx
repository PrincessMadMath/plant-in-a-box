import {Box, Heading, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React from "react";
import {Species} from "shared/api/species";
import {toDuration} from "shared/utils/duration";


interface SpeciesTableProps {
    species: Species[];
}

export const SpeciesTable = ({species}: SpeciesTableProps) => {
    return (
        <Box mt="8">
            <Heading as="h2" size="md">
                Sensors
            </Heading>
            <Table variant="simple" mt="4">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Watering Frequency (in days)</Th>
                        <Th>Fertilization Frequency (in days)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {species.map((x) => (
                        <Tr key={x.speciesId}>
                            <Td>{x.name}</Td>
                            <Td>{toDuration(x.wateringFrequency).days()}</Td>
                            <Td>{toDuration(x.fertilizationFrequency).days()}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}