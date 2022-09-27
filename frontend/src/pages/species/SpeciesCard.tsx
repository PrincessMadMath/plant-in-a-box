import { Avatar, Box, Grid, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FiDroplet } from "react-icons/fi";
import { GiFertilizerBag } from "react-icons/gi";
import { Species } from "shared/api/species";
import { toDuration } from "shared/utils/duration";

interface SpeciesCardProps {
    species: Species;
}

export const SpeciesCard = ({ species }: SpeciesCardProps) => {
    return (
        <Box w={"100%"} borderWidth="1px" borderRadius="lg" p={2}>
            <Grid templateColumns="max-content 1fr" gap={4}>
                <Avatar name={species.name} size="xl" src={"https://via.placeholder.com/150"} />
                <Box>
                    <Text fontSize="2xl">{species.name}</Text>
                    <HStack spacing={1}>
                        <Icon as={FiDroplet} color={"gray.400"} />
                        <Text fontSize="lg" color={"gray.500"}>
                            Watering frequency (days):
                        </Text>
                        <Text fontSize="lg" color={"gray.400"}>
                            {toDuration(species.wateringFrequency).days()}
                        </Text>
                    </HStack>
                    <HStack spacing={1}>
                        <Icon as={GiFertilizerBag} color={"gray.400"} />
                        <Text fontSize="lg" color={"gray.500"}>
                            Fertilization frequency (days):
                        </Text>
                        <Text fontSize="lg" color={"gray.400"}>
                            {toDuration(species.fertilizationFrequency).days()}
                        </Text>
                    </HStack>
                </Box>
            </Grid>
        </Box>
    );
};
