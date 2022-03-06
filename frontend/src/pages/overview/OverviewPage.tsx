import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { ActuatorsOverview } from "./ActuatorsOverview";

import { PlantsOverview } from "./plants/PlantsOverview";
import { SensorsOverview } from "./SensorsOverview";

export const OverviewPage = () => {
    return (
        <Box mt="8">
            <Center>
                <Heading as="h1">Home Plants Center</Heading>
            </Center>
            <PlantsOverview />
            <SensorsOverview />
            <ActuatorsOverview />
        </Box>
    );
};
