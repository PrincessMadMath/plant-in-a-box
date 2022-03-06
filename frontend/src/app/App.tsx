import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import dotenv from "dotenv";
import React from "react";

import "react-datepicker/dist/react-datepicker.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Routes from "./Routes";
import theme from "./theme";

const queryClient = new QueryClient();

dotenv.config();

function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <QueryClientProvider client={queryClient}>
                    <Box mx="6">
                        {/* <SensorDetailsPage sensorId={"88b2f49e-1226-4964-9aa9-9b1f8442fd36"}/> */}
                        <Routes />
                    </Box>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ChakraProvider>
        </>
    );
}

export default App;
