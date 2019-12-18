import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Blog from "./components/pages/Blog";
import Calling from "./components/pages/Calling";
import Change from "./components/pages/Change";
import Danger from "./components/pages/Danger";
import Emerging from "./components/pages/Emerging";
import Habits from "./components/pages/Habits";
import History from "./components/pages/History";
import Leadership from "./components/pages/Leadership";
import Mission from "./components/pages/Mission";
import Pareto from "./components/pages/Pareto";
import Tips from "./components/pages/Tips";

import "./App";

import "./App.scss";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route name="calling" path="/calling" component={Calling}/>
                    <Route name="change" path="/change" component={Change}/>
                    <Route name="danger" path="/danger" component={Danger}/>
                    <Route name="emerging" path="/emerging" component={Emerging}/>
                    <Route name="habits" path="/habits" component={Habits}/>
                    <Route name="history" path="/history" component={History}/>
                    <Route name="leadership" path="/leadership" component={Leadership}/>
                    <Route name="mission" path="/mission" component={Mission}/>
                    <Route name="pareto" path="/pareto" component={Pareto}/>
                    <Route name="tips" path="/tips" component={Tips}/>
                    <Route name="blog" path="/" component={Blog}/>
                </Switch>
            </Provider>
        );  
    };
};
