import {Box, Center, Heading, Spinner} from "@chakra-ui/react";

import React from "react";
import {useParams} from "react-router-dom";
import {useGetPlant} from "shared/api";

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
        return (
            <Box>
                Plant not found.
            </Box>
        );
    }

    return (
        <Box mt="8">
            Plant {plant.name}
        </Box>
    );
};
