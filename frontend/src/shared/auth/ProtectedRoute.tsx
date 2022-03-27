import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { RouteProps } from "react-router";
import { Route } from "react-router-dom";

interface ProtectedRouteProps {
    component: any;
}

export const ProtectedRoute = ({ component, ...args }: ProtectedRouteProps & RouteProps<string>) => (
    <Route
        component={withAuthenticationRequired(component, {
            returnTo: "overview",
            onRedirecting: () => {
                return <div>Loading...</div>;
            },
        })}
        {...args}
    />
);
