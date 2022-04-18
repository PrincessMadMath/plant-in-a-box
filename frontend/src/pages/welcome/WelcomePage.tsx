import { Box, Center, Flex, Heading, Image, Spacer, Spinner } from "@chakra-ui/react";

import React from "react";
import { AuthenticationButton } from "shared/auth";
import BackgroundImage from "./background-opacity-min.png";
import Logo from "./logo.svg";
import styles from "./Welcome.module.css";

interface WelcomePageProps {
    isLoading: boolean;
}

export const WelcomePage = ({ isLoading }: WelcomePageProps) => {
    return (
        <Flex
            pt="8"
            className={styles.container}
            direction={"column"}
            justify={"space-between"}
            backgroundImage={BackgroundImage}
        >
            {isLoading ? <LoadingScreen /> : <LoginScreen />}
        </Flex>
    );
};

const LoadingScreen = () => {
    return (
        <>
            <Spacer />
            <Center>
                <Spinner size="xl" />
            </Center>
            <Spacer />
        </>
    );
};

const LoginScreen = () => {
    return (
        <>
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
        </>
    );
};
