import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import { Plant } from "shared/api";
import { PlantCard } from "./PlantCard";

interface PlantsTableProps {
    plants: Plant[];
}

export const PlantCards = ({ plants }: PlantsTableProps) => {
    const roomGroupedPlants = _.groupBy(plants, (x) => x.room);

    return (
        <Box>
            {Object.entries(roomGroupedPlants).map(([room, roomPlants]) => {
                return (
                    <Box pt={6} key={room}>
                        <HStack pb={6}>
                            <Divider />
                            <Text fontSize="lg" fontWeight={"bold"}>
                                {room}
                            </Text>
                            <Divider />
                        </HStack>
                        <VStack>
                            {roomPlants.map((x) => {
                                return <PlantCard key={x.plantId} plant={x} />;
                            })}
                        </VStack>
                    </Box>
                );
            })}
        </Box>
    );
};
