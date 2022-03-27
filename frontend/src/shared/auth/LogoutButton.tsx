import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
import React from "react";

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return <Button onClick={() => logout()}>Log Out</Button>;
};
