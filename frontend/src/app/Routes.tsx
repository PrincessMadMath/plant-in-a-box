import { ActuatorDetailsPage } from "pages/actuatorDetails/ActuatorDetailsPage";

import { OverviewPage } from "pages/overview/OverviewPage";
import { SensorDetailsPage } from "pages/sensorDetails/SensorDetailsPage";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

const Routes = () => (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/overview" />
            <Route path="/overview" component={OverviewPage} />
            <Route path="/sensor/:sensorId" component={SensorDetailsPage} />
            <Route path="/actuator/:actuatorId" component={ActuatorDetailsPage} />
        </Switch>
    </Router>
);

export default Routes;
