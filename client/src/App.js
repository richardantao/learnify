import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth/auth.action";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Calendar from "./components/calendar/Calendar";
import Academics from "./components/academics/Academics";
import Planner from "./components/planner/Planner";
import Tasks from "./components/tasks/Tasks";
import Assessments from "./components/assessments/Assessments";
import Search from "./components/search/Search";
import Settings from "./components/settings/Settings";
import Help from "./components/help/Help";
import Errors from "./components/errors/Errors";

import "./App";
import './App.scss';

export default class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	};

	render() {
		return (
			<Provider store={store}>
				<Switch>
					<Route name="register" path="/register" component={Register}/>
					<Route name="login" path="/signin" component={Login}/>
					<Route name="dashboard" path="/dashboard" component={Dashboard}/>
					<Route name="calendar" path="/calendar" component={Calendar}/>
					<Route name="academics" path="/academics" component={Academics}/>
					<Route name="planner" path="/planner" component={Planner}/>
					<Route name="tasks" path="/tasks" component={Tasks}/>
					<Route name="assessments" path="/assessments" component={Assessments}/>
					<Route name="search" path="/search" component={Search}/>
					<Route name="settings" path="/settings" component={Settings}/>
					<Route name="help" path="/help" component={Help}/>
					<Route name="errors" path="/errors" component={Errors}/>
				</Switch>
			</Provider>
		);
	};
};
