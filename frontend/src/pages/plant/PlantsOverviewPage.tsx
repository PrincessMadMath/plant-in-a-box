import { Box, Center, Heading } from "@chakra-ui/react";
import { PlantsOverview } from "pages/plant/plants/PlantsOverview";

import React from "react";

export const PlantsOverviewPage = () => {
    return (
        <Box mt="8">
            <Center>
                <Heading as="h1">Home Plants Center</Heading>
            </Center>
            <PlantsOverview />
        </Box>
    );
};
