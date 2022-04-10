import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import Routes from "app/Routes";
import axios from "axios";

import dotenv from "dotenv";
import React from "react";

import "react-datepicker/dist/react-datepicker.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { config } from "shared/config/config";
import theme from "./theme";

const queryClient = new QueryClient();

dotenv.config();

function App() {
    axios.defaults.baseURL = config.api.url;

    return (
        <>
            <MantineProvider theme={{ colorScheme: "dark" }}>
                <ChakraProvider theme={theme}>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <QueryClientProvider client={queryClient}>
                        <Box mx="6">
                            <Routes />
                        </Box>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </ChakraProvider>
            </MantineProvider>
        </>
    );
}

export default App;
