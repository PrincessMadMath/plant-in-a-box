import React from "react";
import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Spinner,
    Text,
    Grid,
} from "@chakra-ui/react";
import { useGetActuator } from "./hooks";
import { useParams } from "react-router-dom";

interface ActuatorDetailsPageProps {
    actuatorId: string;
}

export const ActuatorDetailsPage = () => {
    let { actuatorId } = useParams<ActuatorDetailsPageProps>();
    const { isLoading: isActuatorLoading, data: actuator } =
        useGetActuator(actuatorId);

    if (isActuatorLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    return (
        <Box mt="8">
            <Center>
                <Heading as="h1">{actuator!.name} Details</Heading>
            </Center>
            <Heading as="h2">Details</Heading>
            <Box bg="gray.500" p="6" mt="3" w="2xl">
                <SimpleGrid columns={2}>
                    <Grid
                        templateColumns="max-content 1fr"
                        columnGap={6}
                        rowGap={2}
                        alignContent="start"
                        alignItems="center"
                    >
                        <Text fontSize="md" fontWeight="bold">
                            Name:
                        </Text>
                        <Text fontSize="md">{actuator!.id}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Type:
                        </Text>
                        <Text fontSize="md">{actuator!.type}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Location:
                        </Text>
                        <Text fontSize="md">{actuator!.location}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Plant Box:
                        </Text>
                        <Text fontSize="md">{actuator!.boxName}</Text>
                    </Grid>
                    <Grid
                        templateColumns="max-content 1fr"
                        columnGap={6}
                        rowGap={2}
                        alignContent="start"
                        alignItems="center"
                    >
                        <Text fontSize="md" fontWeight="bold">
                            State:
                        </Text>
                        <Text fontSize="md">{actuator!.state}</Text>
                        <Text fontSize="md" fontWeight="bold">
                            Status:
                        </Text>
                        <Text fontSize="md">{actuator!.status}</Text>
                    </Grid>
                </SimpleGrid>
            </Box>
        </Box>
    );
};
