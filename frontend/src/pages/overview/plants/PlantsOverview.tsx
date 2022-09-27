import { Box, Button, Center, Heading, HStack, Spinner, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { CreatePlantModal } from "pages/overview/plants/CreatePlantModal";
import { PlantsTable } from "pages/overview/plants/PlantsTable";
import React from "react";
import { useGetPlants } from "shared/api";
import { PlantCards } from "./PlantCards";

export const PlantsOverview = () => {
    const { isLoading: isPlantsLoading, data: plants } = useGetPlants();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Hack to force cards
    const useTable = useBreakpointValue({ base: false, lg: true }) && false;

    if (isPlantsLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!plants || plants.length === 0) {
        return (
            <Box mt="8">
                <HStack justify={"space-between"}>
                    <Heading as="h2" size="md">
                        Plants (none registered)
                    </Heading>
                    <Button onClick={onOpen}>Add your first plant</Button>
                </HStack>
                <CreatePlantModal onClose={onClose} isOpen={isOpen} />
            </Box>
        );
    }

    return (
        <Box mt="8">
            <HStack justify={"space-between"}>
                <Heading as="h2" size="lg">
                    Plants
                </Heading>
                <Button onClick={onOpen}>Add a plant</Button>
            </HStack>
            <CreatePlantModal onClose={onClose} isOpen={isOpen} />
            {useTable ? <PlantsTable plants={plants} /> : <PlantCards plants={plants} />}
        </Box>
    );
};
