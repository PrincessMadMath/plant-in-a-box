import { useAuth0 } from "@auth0/auth0-react";
import { Shell } from "app/Shell";
import { WelcomePage } from "pages/welcome/WelcomePage";
import React from "react";

export const Routes = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (!isAuthenticated) {
        return <WelcomePage isLoading={isLoading} />;
    }

    return <Shell />;
};
