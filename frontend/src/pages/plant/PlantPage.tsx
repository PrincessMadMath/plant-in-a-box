import { Box, Center, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

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
                    <Tab>Info2</Tab>
                    <Tab>Species</Tab>
                    <Tab>Activities</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};
