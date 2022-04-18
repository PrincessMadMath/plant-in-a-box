import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";

import React from "react";
import { AuthenticationButton } from "shared/auth";
import Logo from "./logo.svg";
import styles from "./Welcome.module.css";

export const WelcomePage = () => {
    return (
        <Flex pt="8" className={styles.container} direction={"column"} justify={"space-between"}>
            <Box>
                <Center>
                    <Image src={Logo} boxSize="80px" alt="PIB Logo" />
                </Center>
                <Center mt={"3"}>
                    <Heading as="h1" fontSize="4xl">
                        Plant In a Box
                    </Heading>
                </Center>
                <Box mt={"4"}>
                    <Center>Keep your plants alive.</Center>
                </Box>
            </Box>
            <Box mb={3} px={2}>
                <Center>
                    <AuthenticationButton />
                </Center>
            </Box>
        </Flex>
    );
};
