import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import { Auth0ProviderWithHistory } from "app/Auth0ProviderWithHistory";
import { RequestInterceptor } from "app/RequestInterceptor";
import { Routes } from "app/Routes";
import axios from "axios";

import dotenv from "dotenv";
import React from "react";

import "react-datepicker/dist/react-datepicker.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
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
                        <Router>
                            <Auth0ProviderWithHistory>
                                <RequestInterceptor>
                                    <Routes />
                                </RequestInterceptor>
                            </Auth0ProviderWithHistory>
                        </Router>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </ChakraProvider>
            </MantineProvider>
        </>
    );
}

export default App;
