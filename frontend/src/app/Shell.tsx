import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { AppShell, Burger, Header, MediaQuery, Navbar, useMantineTheme } from "@mantine/core";
import { ActuatorDetailsPage } from "pages/actuatorDetails/ActuatorDetailsPage";
import { PlantPage } from "pages/plant/PlantPage";
import { PlantsOverviewPage } from "pages/plant/PlantsOverviewPage";
import { ProfilePage } from "pages/profile/ProfilePage";
import { SensorDetailsPage } from "pages/sensors/sensorDetails/SensorDetailsPage";
import { SensorsOverviewPage } from "pages/sensors/SensorsOverviewPage";
import { SpeciesPage } from "pages/species/SpeciesPage";

import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthenticationButton } from "shared/auth";
import { ProtectedRoute } from "shared/auth/ProtectedRoute";
import Logo from "./logo.svg";

export const Shell = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const history = useHistory();

    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Navbar.Section grow mt="md">
                        <Flex direction={"column"}>
                            <Button
                                onClick={() => {
                                    history.push(`/plants`);
                                    setOpened(false);
                                }}
                            >
                                My Plants
                            </Button>
                            <Button
                                mt={4}
                                onClick={() => {
                                    history.push(`/sensors`);
                                    setOpened(false);
                                }}
                            >
                                My Sensors
                            </Button>
                            <Button
                                mt={4}
                                onClick={() => {
                                    history.push(`/species`);
                                    setOpened(false);
                                }}
                            >
                                Species
                            </Button>
                            <Button
                                mt={4}
                                onClick={() => {
                                    history.push(`/profile`);
                                    setOpened(false);
                                }}
                            >
                                My Profile
                            </Button>
                        </Flex>
                    </Navbar.Section>
                    <Navbar.Section>
                        <AuthenticationButton />
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header height={70} p="md">
                    <Flex alignItems={"center"} justify={"space-between"} height="100%">
                        <Flex alignItems={"center"}>
                            <Image src={Logo} boxSize="40px" alt="PIB Logo" />
                            <Text ml={"3"} fontSize="2xl">
                                PIB
                            </Text>
                        </Flex>
                        <Box>
                            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>
                        </Box>
                    </Flex>
                </Header>
            }
        >
            <AuthenticatedApp />
        </AppShell>
    );
};

const AuthenticatedApp = () => {
    return (
        <Switch>
            <Route exact path="/" component={PlantsOverviewPage} />
            <ProtectedRoute path="/plants" component={PlantsOverviewPage} />
            <ProtectedRoute path="/species" component={SpeciesPage} />
            <ProtectedRoute path="/sensors" component={SensorsOverviewPage} />
            <ProtectedRoute path="/plant/:plantId" component={PlantPage} />
            <ProtectedRoute path="/sensor/:sensorId" component={SensorDetailsPage} />
            <ProtectedRoute path="/actuator/:actuatorId" component={ActuatorDetailsPage} />
            <ProtectedRoute path="/profile" component={ProfilePage} />
        </Switch>
    );
};
