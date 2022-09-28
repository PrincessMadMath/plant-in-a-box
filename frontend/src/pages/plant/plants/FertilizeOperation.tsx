import { Button } from "@chakra-ui/react";
import React from "react";
import { GiFertilizerBag } from "react-icons/gi";
import { Plant, useFertilizePlant } from "shared/api";

interface FertilizeOperationProps {
    plant: Plant;
}

export const FertilizeOperation = ({ plant }: FertilizeOperationProps) => {
    const fertilizeCommand = useFertilizePlant();

    return (
        <Button
            leftIcon={<GiFertilizerBag />}
            width="full"
            isLoading={fertilizeCommand.isLoading}
            onClick={() => fertilizeCommand.mutate({ plantId: plant.plantId })}
            colorScheme="teal"
            variant="outline"
        >
            Fertilize
        </Button>
    );
};
