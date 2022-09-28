import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
import React from "react";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect({ redirectUri: `${window.location.origin}/plants` });
    };

    return (
        <Button width="100%" onClick={handleLogin}>
            Log In
        </Button>
    );
};
