import { Box, VStack } from "@chakra-ui/react";
import { SpeciesCard } from "pages/species/SpeciesCard";
import React from "react";
import { Species } from "shared/api/species";

interface SpeciesCardsProps {
    species: Species[];
}

export const SpeciesCards = ({ species }: SpeciesCardsProps) => {
    return (
        <Box>
            <VStack>
                {species.map((s) => {
                    return <SpeciesCard key={s.speciesId} species={s} />;
                })}
            </VStack>
        </Box>
    );
};
