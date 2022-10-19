import { Box, Center, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PlantSensors } from "pages/plant/plantDetails/PlantSensors";

import React from "react";
import { useParams } from "react-router-dom";
import { useGetPlant } from "shared/api";

interface PlantPageProps {
    plantId: string;
}

export const PlantPage = () => {
    const { plantId } = useParams<PlantPageProps>();

    const { isLoading: isPlantLoading, data: plant } = useGetPlant(plantId);

    if (isPlantLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!plant) {
        return <Box>Plant not found.</Box>;
    }

    return (
        <Box mt="8">
            Plant {plant.name}
            <Tabs>
                <TabList>
                    <Tab>Sensors</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <PlantSensors plant={plant} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};
