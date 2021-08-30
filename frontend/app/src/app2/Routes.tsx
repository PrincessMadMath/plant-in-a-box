import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { OverviewPage } from "pages/overview/OverviewPage";
import { SensorDetailsPage } from "pages/sensorDetails/SensorDetailsPage";

const Routes = () => (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/overview" />
            <Route path="/overview" component={OverviewPage} />
            <Route path="/sensor" component={SensorDetailsPage} />
        </Switch>
    </Router>
);

export default Routes;