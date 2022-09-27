import { Box, Button, Center, Heading, HStack, Spinner, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { CreatePlantModal } from "pages/overview/plants/CreatePlantModal";
import { PlantCards } from "pages/overview/plants/PlantCards";
import { PlantsTable } from "pages/overview/plants/PlantsTable";
import { CreateSpeciesModal } from "pages/species/CreateSpeciesModal";
import {SpeciesCard} from "pages/species/SpeciesCard";
import {SpeciesCards} from "pages/species/SpeciesCards";
import { SpeciesTable } from "pages/species/SpeciesTable";

import React from "react";
import { useGetAllSpecies } from "shared/api/species/species.hooks";

export const SpeciesPage = () => {
    const { isLoading: isSpeciesLoading, data: species } = useGetAllSpecies();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Hack to force cards
    const useTable = useBreakpointValue({ base: false, lg: true }) && false;

    if (isSpeciesLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!species || species.length === 0) {
        return (
            <Box mt="8">
                <HStack justify={"space-between"}>
                    <Heading as="h2" size="md">
                        Species (none registered)
                    </Heading>
                    <Button onClick={onOpen}>Add your first species</Button>
                </HStack>
                <CreateSpeciesModal onClose={onClose} isOpen={isOpen} />
            </Box>
        );
    }

    return (
        <Box mt="8">
            <HStack justify={"space-between"}>
                <Heading as="h2" size="lg">
                    Species
                </Heading>
                <Button onClick={onOpen}>Add species</Button>
            </HStack>
            <CreateSpeciesModal onClose={onClose} isOpen={isOpen} />
            <Box  pt={6}>  
                {useTable ? <SpeciesTable species={species} /> : <SpeciesCards species={species} />}
            </Box>
        </Box>
    );
};
