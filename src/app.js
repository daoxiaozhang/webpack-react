import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "@page/home";

export default params => {
    return (
        <Router>
            <AppContextProvider>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </AppContextProvider>
        </Router>
    );
};
