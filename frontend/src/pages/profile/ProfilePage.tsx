import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import {config} from "shared/config/config";

export const ProfilePage = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: config.auth.audience,
                    scope:"Plant.Read Plant.Write.All Plant.Write.Operations",
                });

                const userDetailsByIdUrl = `${config.api.url}/test/Protected`;

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
