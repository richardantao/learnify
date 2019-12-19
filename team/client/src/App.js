import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Roles from "./components/pages/Roles";
import Backend from "./components/pages/Backend";
import Designer from "./components/pages/Designer";
import Frontend from "./components/pages/Frontend";
import Marketer from "./components/pages/Marketer";
import Swift from "./components/pages/Swift";

import "./App";
import "./App.scss";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route name="login" path="/signin" component={Login}/>
                    <Route name="roles" path="/roles" component={Roles}/>
                    <Route name="backend" path="/roles/backend" component={Backend}/>
                    <Route name="designer" path="/roles/designer" component={Designer}/>
                    <Route name="frontend" path="/roles/frontend" component={Frontend}/>
                    <Route name="marketer" path="/roles/marketer" component={Marketer}/>
                    <Route name="swift" path="/roles/swift" component={Swift}/>
                    <Route name="home" path="/" component={Home}/>
                </Switch>
            </Provider>
        );  
    };
};