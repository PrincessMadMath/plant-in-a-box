import { AppState, Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useHistory } from "react-router-dom";
import { config } from "shared/config/config";

// https://auth0.com/blog/complete-guide-to-react-user-authentication/
export const Auth0ProviderWithHistory = ({ children }: any) => {
    const history = useHistory();

    const onRedirectCallback = (appState?: AppState) => {
        history.replace(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={config.auth.domain}
            clientId={config.auth.clientId}
            audience={config.auth.audience}
            scope="plant"
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
