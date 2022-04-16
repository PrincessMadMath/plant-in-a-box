import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";
import { config } from "shared/config/config";

interface RequestInterceptorProps {
    children: JSX.Element;
}

export const RequestInterceptor: React.FC<RequestInterceptorProps> = ({ children }: RequestInterceptorProps) => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    /* eslint-disable no-param-reassign */
    axios.interceptors.request.use(async (requestConfig) => {
        if (!isAuthenticated) {
            return requestConfig;
        }

        const accessToken = await getAccessTokenSilently({
            audience: config.auth.audience,
            scope: "plant",
        });

        // @ts-ignore
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;

        return requestConfig;
    });
    /* eslint-enable no-param-reassign */

    return <>{children}</>;
};
