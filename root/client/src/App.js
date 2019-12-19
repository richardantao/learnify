import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

import "./App";

import "./App.scss";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Switch>
                    <Route name="about" path="/about" component={About}/>
                    <Route name="contact" path="/contact" component={Contact}/>
                    <Route name="home" path="/" component={Home}/>
                </Switch>
            </Provider>
        );  
    };
};
