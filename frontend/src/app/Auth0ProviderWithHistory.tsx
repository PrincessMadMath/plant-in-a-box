// https://auth0.com/blog/complete-guide-to-react-user-authentication/

import {AppState, Auth0Provider} from "@auth0/auth0-react";
import React from "react";
import {useHistory} from "react-router-dom";
import {config} from "shared/config/config";

export const Auth0ProviderWithHistory = ({children}: any) => {
    const history = useHistory();

    const onRedirectCallback = (appState: AppState) => {
        history.replace(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={config.auth.domain}
            clientId={config.auth.clientId}
            // audience={config.auth.audience}/
            // scope="Plant.Read Plant.Write.All Plant.Write.Operations"
            audience="https://dev-macadam.us.auth0.com/api/v2/"
            scope="read:current_user update:current_user_metadata"
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};
