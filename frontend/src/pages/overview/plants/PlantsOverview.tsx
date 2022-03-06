import { Box, Center, Heading, Spinner, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useGetPlants } from "shared/api";
import { PlantCards } from "./PlantCards";

export const PlantsOverview = () => {
    const { isLoading: isPlantsLoading, data: plants } = useGetPlants();
    const useTable = useBreakpointValue({ base: false, lg: true });

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
                <Heading as="h2" size="md">
                    Plants (none registered)
                </Heading>
            </Box>
        );
    }

    return (
        <Box mt="8">
            <Heading as="h2" size="md">
                Plants
            </Heading>
            {/*{useTable ? <PlantsTable plants={plants} /> : <PlantCards plants={plants} />}*/}
            <PlantCards plants={plants} />
        </Box>
    );
};
