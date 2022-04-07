import { Auth0ProviderWithHistory } from "app/Auth0ProviderWithHistory";
import { ActuatorDetailsPage } from "pages/actuatorDetails/ActuatorDetailsPage";

import { OverviewPage } from "pages/overview/OverviewPage";
import { ProfilePage } from "pages/profile/ProfilePage";
import { SensorDetailsPage } from "pages/sensorDetails/SensorDetailsPage";
import { WelcomePage } from "pages/welcome/WelcomePage";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "shared/auth/ProtectedRoute";

const Routes = () => (
    <Router>
        <Auth0ProviderWithHistory>
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <ProtectedRoute path="/overview" component={OverviewPage} />
                <ProtectedRoute path="/sensor/:sensorId" component={SensorDetailsPage} />
                <ProtectedRoute path="/actuator/:actuatorId" component={ActuatorDetailsPage} />
                <ProtectedRoute path="/profile" component={ProfilePage} />
            </Switch>
        </Auth0ProviderWithHistory>
    </Router>
);

export default Routes;
