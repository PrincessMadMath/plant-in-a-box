import React from "react";
import { useHistory } from "react-router-dom";

import { Box, Center, Heading } from "@chakra-ui/react";

import { PlantsOverview } from "./PlantsOverview";
import { SensorsOverview } from "./SensorsOverview";
import { ActuatorsOverview } from "./ActuatorsOverview";

export const OverviewPage = () => {
    const history = useHistory();

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
