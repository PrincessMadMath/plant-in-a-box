// https://auth0.com/blog/complete-guide-to-react-user-authentication/

import { AppState, Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useHistory } from "react-router-dom";
import { config } from "shared/config/config";

export const Auth0ProviderWithHistory = ({ children }: any) => {
    const history = useHistory();

    const onRedirectCallback = (appState: AppState) => {
        history.replace(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={config.auth.domain}
            clientId={config.auth.clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
