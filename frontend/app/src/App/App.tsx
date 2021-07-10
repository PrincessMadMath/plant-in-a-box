import React from "react";
import "./App.css";

import dotenv from "dotenv";
import { OverviewPage } from "Overview/OverviewPage";

import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

dotenv.config();

function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <Box mx="6">
                    {/* <SensorDetailsPage sensorId={"88b2f49e-1226-4964-9aa9-9b1f8442fd36"}/> */}
                    <OverviewPage />
                </Box>
            </ChakraProvider>
        </>
    );
}

export default App;
