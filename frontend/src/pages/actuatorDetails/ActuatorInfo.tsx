import { Box, Grid, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Actuator } from "shared/api/actuators";

interface ActuatorDetailsProps {
    actuator: Actuator;
}

export const ActuatorInfo = ({ actuator }: ActuatorDetailsProps) => {
    return (
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
                    <Text fontSize="md">{actuator!.name}</Text>
                    <Text fontSize="md" fontWeight="bold">
                        Type:
                    </Text>
                    <Text fontSize="md">{actuator!.type}</Text>
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
    );
};
