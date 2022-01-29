import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { OverviewPage } from "pages/overview/OverviewPage";
import { ActuatorDetailsPage } from "pages/actuatorDetails/ActuatorDetailsPage";
import { SensorDetailsPage } from "pages/sensorDetails/SensorDetailsPage";

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
