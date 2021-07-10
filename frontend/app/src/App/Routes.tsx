import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { OverviewPage } from "Overview/OverviewPage";
import { SensorDetailsPage } from "SensorDetails/SensorDetailsPage";

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
