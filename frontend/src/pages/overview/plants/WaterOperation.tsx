import { Button } from "@chakra-ui/react";
import React from "react";
import { FiDroplet } from "react-icons/fi";
import { Plant, useWaterPlant } from "shared/api";

interface WaterOperationProps {
    plant: Plant;
}

export const WaterOperation = ({ plant }: WaterOperationProps) => {
    const waterCommand = useWaterPlant();

    return (
        <Button
            leftIcon={<FiDroplet />}
            isFullWidth
            isLoading={waterCommand.isLoading}
            onClick={() => waterCommand.mutate({ plantId: plant.plantId })}
            colorScheme="teal"
        >
            Water
        </Button>
    );
};
