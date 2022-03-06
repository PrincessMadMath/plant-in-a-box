import React from "react";
import { Plant, useGetPlants } from "shared/api";
import {
    Avatar,
    Box,
    Center,
    Collapse,
    Divider,
    Flex,
    Grid,
    Heading,
    HStack,
    Icon,
    IconButton,
    Spinner,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { formatFrom } from "../../shared/utils";
import { FiChevronDown, FiChevronUp, FiDroplet } from "react-icons/fi";
import { MdCake } from "react-icons/md";
import { GiBoxUnpacking, GiFertilizerBag, GiGreenhouse, GiPlantSeed } from "react-icons/gi";

export const PlantsOverview = () => {
    const { isLoading: isPlantsLoading, data: plants } = useGetPlants();

    if (isPlantsLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!plants || plants.length === 0) {
        return (
            <Box mt="8">
                <Heading as="h2" size="md">
                    Plants (none registered)
                </Heading>
            </Box>
        );
    }

    return (
        <Box mt="8">
            <Heading as="h2" size="md">
                Plants
            </Heading>
            <VStack>
                {plants.map((x) => {
                    return <PlantCard key={x.plantId} plant={x} />;
                })}
            </VStack>
        </Box>
    );
};

interface PlantCardProps {
    plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Grid borderWidth="1px" borderRadius="lg" p={2} w={"100%"} templateColumns="max-content 1fr" gap={4}>
            <Avatar
                name={plant.name}
                size="xl"
                src="https://images.pexels.com/photos/3192175/pexels-photo-3192175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
            <Box>
                <Flex justify={"space-between"} direction={"row"}>
                    <Text fontSize="2xl" pb={2}>
                        {plant.name}
                    </Text>
                    <IconButton
                        aria-label="Expand plant information."
                        onClick={onToggle}
                        icon={isOpen ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />}
                    />
                </Flex>
                <HStack spacing={1}>
                    <Icon as={FiDroplet} color={"gray.400"} />
                    <Box fontSize="lg" color={"gray.400"}>
                        {formatOperationsDate(plant.operations?.lastWateredDate)}
                    </Box>
                </HStack>
                <HStack spacing={1}>
                    <Icon as={GiPlantSeed} color={"gray.500"} />
                    <Box fontSize="m" color={"gray.500"}>
                        {plant.species}
                    </Box>
                </HStack>
                <Collapse in={isOpen} animateOpacity>
                    <Box mt="4">
                        <HStack spacing={1}>
                            <Icon as={GiFertilizerBag} color={"gray.500"} />
                            <Box fontSize="m" color={"gray.500"}>
                                {formatOperationsDate(plant.operations?.lastFertilizedDate)}
                            </Box>
                        </HStack>
                        <HStack spacing={1}>
                            <Icon as={GiBoxUnpacking} color={"gray.500"} />
                            <Box fontSize="m" color={"gray.500"}>
                                {formatOperationsDate(plant.operations?.lastRepotDate)}
                            </Box>
                        </HStack>
                        <HStack spacing={1}>
                            <Icon as={MdCake} color={"gray.500"} />
                            <Box fontSize="m" color={"gray.500"}>
                                {formatOperationsDate(plant.acquisitionDate)}
                            </Box>
                        </HStack>
                        <Divider mt={2} mb={2} />
                        <HStack spacing={1}>
                            <Icon as={GiGreenhouse} color={"gray.500"} />
                            <Box fontSize="m" color={"gray.500"}>
                                {plant.room} - {plant.pot}
                            </Box>
                        </HStack>
                    </Box>
                </Collapse>
            </Box>
        </Grid>
    );
};

const formatOperationsDate = (date: string) => {
    if (date == null) {
        return "Never";
    }

    return formatFrom(date);
};
