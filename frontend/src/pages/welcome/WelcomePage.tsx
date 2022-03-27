import { Box, Center, Heading } from "@chakra-ui/react";

import React from "react";
import { AuthenticationButton } from "shared/auth";

export const WelcomePage = () => {
    return (
        <Box mt="8">
            <Center>
                <Heading as="h1">Welcome to PIB</Heading>
            </Center>
            <Center>
                <AuthenticationButton />
            </Center>
        </Box>
    );
};
