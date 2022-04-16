import { Box, Center, Heading } from "@chakra-ui/react";

import React from "react";

import { PlantsOverview } from "./plants/PlantsOverview";

export const OverviewPage = () => {
    return (
        <Box mt="8">
            <Center>
                <Heading as="h1">Home Plants Center</Heading>
            </Center>
            <PlantsOverview />
            {/*<SensorsOverview />*/}
            {/*<ActuatorsOverview />*/}
        </Box>
    );
};
