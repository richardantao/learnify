import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Start from "./components/pages/Start";
import Api from "./components/pages/Api";
import Changelog from "./components/pages/Changelog";
import Cookies from "./components/pages/Cookies";
import Privacy from "./components/pages/Privacy";
import Sitemap from "./components/pages/Sitemap";
import Status from "./components/pages/Status";
import Terms from "./components/pages/Terms";

import "./App";

import "./App.scss";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route name="api" path="/api" component={Api}/>
                    <Route name="changelog" path="/changelog" component={Changelog}/>
                    <Route name="cookies" path="/cookies" component={Cookies}/>
                    <Route name="privacy" path="/privacy" component={Privacy}/>
                    <Route name="sitemap" path="/sitemap" component={Sitemap}/>
                    <Route name="status" path="/status" component={Status}/>
                    <Route name="terms" path="/terms" component={Terms}/>
                    <Route name="start" path="/" component={Start}/>
                </Switch>
            </Provider>
        );  
    };
};
