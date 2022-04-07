import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

export const ProfilePage = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-macadam.us.auth0.com";
            
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user!.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const response = await metadataResponse.json();

                setUserMetadata(response);
            } catch (e: any) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);


    if (!user) {
        return <div>Not authenticated</div>;
    }


    return (
        <Box mt="8">
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h3>User Metadata</h3>
            {userMetadata ? <pre>{JSON.stringify(userMetadata, null, 2)}</pre> : "No user metadata defined"}
        </Box>
    );
};
