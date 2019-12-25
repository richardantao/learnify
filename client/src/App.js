/* --- React dependencies --- */
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/* --- Redux dependencies */
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth/auth.action";

/* --- Beta components --- */
import BetaRegister from "./components/beta/auth/BetaRegister";
import Login from "./components/beta/auth/Login";
import VerifyEmail from "./components/beta/auth/VerifyEmail";
import ForgotPassword from "./components/beta/auth/ForgotPassword";
import ResetPassword from "./components/beta/auth/ResetPassword";
import Dashboard from "./components/beta/dashboard/Dashboard";
import Calendar from "./components/beta/calendar/Calendar";
import Academics from "./components/beta/academics/Academics";
import Planner from "./components/beta/planner/Planner";
import Tasks from "./components/beta/tasks/Tasks";
import Assessments from "./components/beta/assessments/Assessments";
import Search from "./components/beta/search/Search";
import Settings from "./components/beta/settings/Settings";
import Help from "./components/beta/help/Help";

/* --- Blog components --- */
import Blog from "./components/blog/pages/Blog";
import Calling from "./components/blog/pages/Calling";
import Change from "./components/blog/pages/Change";
import Danger from "./components/blog/pages/Danger";
import Emerging from "./components/blog/pages/Emerging";
import Habits from "./components/blog/pages/Habits";
import History from "./components/blog/pages/History";
import Leadership from "./components/blog/pages/Leadership";
import Mission from "./components/blog/pages/Mission";
import Pareto from "./components/blog/pages/Pareto";
import Tips from "./components/blog/pages/Tips";

/* --- Docs components --- */
import Docs from "./components/docs/pages/Docs";
import Api from "./components/docs/pages/Api";
import Terms from "./components/docs/pages/Terms";
import Privacy from "./components/docs/pages/Privacy";
import Cookies from "./components/docs/pages/Cookies";
import Changelog from "./components/docs/pages/Changelog";
import Sitemap from "./components/docs/pages/Sitemap";
import Status from "./components/docs/pages/Status";

/* --- Root components --- */
import Home from "./components/root/pages/Home";
import About from "./components/root/pages/About";
import Contact from "./components/root/pages/Contact";
import NotFound from "./components/public/pages/NotFound";

/* --- Team components --- */
import Team from "./components/team/pages/Team";
import Roles from "./components/team/pages/Roles";
import TeamRegister from "./components/team/pages/TeamRegister";

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
					<Route name="register" path="/beta/register" component={BetaRegister}/>
					<Route name="login" path="/beta/signin" component={Login}/>
					<Route name="verifyEmail" path="/beta/verifyEmail" component={VerifyEmail}/>
					<Route name="forgotPassword" path="/beta/forgotPassword" component={ForgotPassword}/>
					<Route name="resetPassword" path="/beta/resetPassword" component={ResetPassword}/>
					<Route name="dashboard" path="/beta/dashboard" component={Dashboard}/>
					<Route name="calendar" path="/beta/calendar" component={Calendar}/>
					<Route name="academics" path="/beta/academics" component={Academics}/>
					<Route name="planner" path="/beta/planner" component={Planner}/>
					<Route name="tasks" path="/beta/tasks" component={Tasks}/>
					<Route name="assessments" path="/beta/assessments" component={Assessments}/>
					<Route name="search" path="/beta/search" component={Search}/>
					<Route name="settings" path="/beta/settings" component={Settings}/>
					<Route name="help" path="/beta/help" component={Help}/>

					<Route name="calling" path="/blog/calling" component={Calling}/>
                    <Route name="change" path="/blog/change" component={Change}/>
                    <Route name="danger" path="/blog/danger" component={Danger}/>
                    <Route name="emerging" path="/blog/emerging" component={Emerging}/>
                    <Route name="habits" path="/blog/habits" component={Habits}/>
                    <Route name="history" path="/blog/history" component={History}/>
                    <Route name="leadership" path="/blog/leadership" component={Leadership}/>
                    <Route name="mission" path="/blog/mission" component={Mission}/>
                    <Route name="pareto" path="/blog/pareto" component={Pareto}/>
                    <Route name="tips" path="/blog/tips" component={Tips}/>
                    <Route name="blog" path="/blog" component={Blog}/>

					<Route name="api" path="/docs/api" component={Api}/>
                    <Route name="changelog" path="/docs/changelog" component={Changelog}/>
                    <Route name="cookies" path="/docs/cookies" component={Cookies}/>
                    <Route name="privacy" path="/docs/privacy" component={Privacy}/>
                    <Route name="sitemap" path="/docs/sitemap" component={Sitemap}/>
                    <Route name="status" path="/docs/status" component={Status}/>
                    <Route name="terms" path="/docs/terms" component={Terms}/>
                    <Route name="docs" path="/docs" component={Docs}/>

					<Route name="about" path="/about" component={About}/>
                    <Route name="contact" path="/contact" component={Contact}/>
                    <Route name="home" exact path="/" component={Home}/>

					<Route name="register" path="/team/register" component={TeamRegister}/>
                    <Route name="roles" path="/team/roles" component={Roles}/>
                    <Route name="team" path="/team" component={Team}/>

                    <Route name="404" path="*" component={NotFound}/>
				</Switch>
			</Provider>
		);
	};
};
