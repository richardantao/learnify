/* --- Static dependencies --- */
import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import LogRocket from "logrocket";

/* --- Redux --- */
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth/auth";

/* --- Dynamic Imports, see components below App Routing --- */
import Loadable from "react-loadable";
import Loading from "./components/public/global/organisms/Loading";

import "./App.scss";

/* --- App Routing --- */
class App extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired
	};

	componentDidMount() {
		// LogRocket.init("desbiw/learnify");
		// store.dispatch(loadUser());
	};

	componentDidUpdate(prevProps) {
		const { location: { pathname } } = this.props;
		if (pathname !== prevProps.pathname) {
			this.handleRouteChange();
		};
	};

	handleRouteChange = () => {

	};

	render() {
		return (
			<Provider store={store}>
				<Switch>
					<Route name="register" path="/beta/register" component={AppRegister}/>
					<Route name="login" path="/beta/signin" component={AppLogin}/>
					<Route name="verifyEmail" path="/beta/verify-email" component={AppVerify}/>
					<Route name="forgotPassword" path="/beta/forgot-password" component={AppForgot}/>
					<Route name="resetPassword" path="/beta/reset-password" component={AppReset}/>
					<Route name="dashboard" path="/beta/dashboard" component={Dashboard}/>
					<Route name="calendar" path="/beta/calendar" component={Calendar}/>
					<Route name="academics" path="/beta/academics" component={Academics}/>
					<Route name="planner" path="/beta/planner" component={Planner}/>
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

                    <Route name="changelog" path="/docs/changelog" component={Changelog}/>
                    <Route name="cookies" path="/docs/cookies" component={Cookies}/>
					<Route name="developers" path="/docs/developers" component={Developers}/>
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

export default withRouter(App);

/* --- App components --- */
const AppRegister = Loadable({
	loader: () => import(/* webpackChunkName: "AppRegister" */ "./components/app/reactors/AppRegister"),
	loading: Loading,
	delay: 300
});

const AppLogin = Loadable({
	loader: () => import(/* webpackChunkName: "AppLogin" */ "./components/app/reactors/AppLogin"),
	loading: Loading,
	delay: 300
});

const AppVerify = Loadable({
	loader: () => import(/* webpackChunkName: "AppVerify" */ "./components/app/reactors/AppVerify"),
	loading: Loading,
	delay: 300
});

const AppForgot = Loadable({
	loader: () => import(/* webpackChunkName: "AppForgot" */ "./components/app/reactors/AppForgot"),
	loading: Loading,
	delay: 300
});

const AppReset = Loadable({
	loader: () => import(/* webpackChunkName: "AppReset" */ "./components/app/reactors/AppReset"),
	loading: Loading,
	delay: 300
});

const Dashboard = Loadable({
	loader: () => import(/* webpackChunkName: "Dashboard" */ "./components/app/pages/Dashboard"),
	loading: Loading,
	delay: 300
});

const Calendar = Loadable({
	loader: () => import(/* webpackChunkName: "Calendar" */ "./components/app/pages/Calendar"),
	loading: Loading,
	delay: 300
});

const Academics = Loadable({
	loader: () => import(/* webpackChunkName: "Academics" */ "./components/app/pages/Academics"),
	loading: Loading,
	delay: 300
});

const Planner = Loadable({
	loader: () => import(/* webpackChunkName: "Planner" */ "./components/app/pages/Planner"),
	loading: Loading,
	delay: 300
});

const Settings = Loadable({
	loader: () => import(/* webpackChunkName: "Settings" */ "./components/app/pages/Settings"),
	loading: Loading,
	delay: 300
});

const Help = Loadable({
	loader: () => import(/* webpackChunkName: "Help" */ "./components/app/pages/Help"),
	loading: Loading,
	delay: 300
});

/* --- Blog components --- */
const Blog = Loadable({
	loader: () => import(/* webpackChunkName: "Blog" */ "./components/public/blog/pages/Blog"),
	loading: Loading,
	delay: 300
});

const Calling = Loadable({
	loader: () => import(/* webpackChunkName: "Calling" */ "./components/public/blog/pages/Calling"),
	loading: Loading,
	delay: 300
});

const Change = Loadable({
	loader: () => import(/* webpackChunkName: "Change" */ "./components/public/blog/pages/Change"),
	loading: Loading,
	delay: 300
});

const Danger = Loadable({
	loader: () => import(/* webpackChunkName: "Danger" */ "./components/public/blog/pages/Danger"),
	loading: Loading,
	delay: 300
});

const Emerging = Loadable({
	loader: () => import(/* webpackChunkName: "Emerging" */ "./components/public/blog/pages/Emerging"),
	loading: Loading,
	delay: 300
});

const Habits = Loadable({
	loader: () => import(/* webpackChunkName: "Habits" */ "./components/public/blog/pages/Habits"),
	loading: Loading,
	delay: 300
});

const History = Loadable({
	loader: () => import(/* webpackChunkName: "History" */ "./components/public/blog/pages/History"),
	loading: Loading,
	delay: 300
});
const Leadership = Loadable({
	loader: () => import(/* webpackChunkName: "Leadership" */ "./components/public/blog/pages/Leadership"),
	loading: Loading,
	delay: 300
});
const Mission = Loadable({
	loader: () => import(/* webpackChunkName: "Mission" */ "./components/public/blog/pages/Mission"),
	loading: Loading,
	delay: 300
});
const Pareto = Loadable({
	loader: () => import(/* webpackChunkName: "Pareto" */ "./components/public/blog/pages/Pareto"),
	loading: Loading,
	delay: 300
});
const Tips = Loadable({
	loader: () => import(/* webpackChunkName: "Tips" */ "./components/public/blog/pages/Tips"),
	loading: Loading,
	delay: 300
});

/* --- Docs components --- */
const Docs = Loadable({
	loader: () => import(/* webpackChunkName: "Docs" */ "./components/public/docs/pages/Docs"),
	loading: Loading,
	delay: 300
});

const Developers = Loadable({
	loader: () => import(/* webpackChunkName: "Developers" */ "./components/public/docs/pages/Developers"),
	loading: Loading,
	delay: 300
});

const Terms = Loadable({
	loader: () => import(/* webpackChunkName: "Terms" */ "./components/public/docs/pages/Terms"),
	loading: Loading,
	delay: 300
});

const Privacy = Loadable({
	loader: () => import(/* webpackChunkName: "Privacy" */ "./components/public/docs/pages/Privacy"),
	loading: Loading,
	delay: 300
});

const Cookies = Loadable({
	loader: () => import(/* webpackChunkName: "Cookies" */ "./components/public/docs/pages/Cookies"),
	loading: Loading,
	delay: 300
});

const Changelog = Loadable({
	loader: () => import(/* webpackChunkName: "Changelog" */ "./components/public/docs/pages/Changelog"),
	loading: Loading,
	delay: 300
});

const Sitemap = Loadable({
	loader: () => import(/* webpackChunkName: "Sitemap" */ "./components/public/docs/pages/Sitemap"),
	loading: Loading,
	delay: 300
});

const Status = Loadable({
	loader: () => import(/* webpackChunkName: "Status" */ "./components/public/docs/pages/Status"),
	loading: Loading,
	delay: 300
});

/* --- Root components --- */
const Home = Loadable({
	loader: () => import(/* webpackChunkName: "Home" */ "./components/public/root/pages/Home"),
	loading: Loading,
	delay: 300
});

const About = Loadable({
	loader: () => import(/* webpackChunkName: "About" */ "./components/public/root/pages/About"),
	loading: Loading,
	delay: 300
});

const Contact = Loadable({
	loader: () => import(/* webpackChunkName: "Contact" */ "./components/public/root/pages/Contact"),
	loading: Loading,
	delay: 300
});

const NotFound = Loadable({
	loader: () => import(/* webpackChunkName: "NotFound" */ "./components/public/global/pages/NotFound/NotFound"),
	loading: Loading,
	delay: 300
});

/* --- Team components --- */
const Team = Loadable({
	loader: () => import(/* webpackChunkName: "Team" */ "./components/public/team/pages/Team"),
	loading: Loading,
	delay: 300
});

const Roles = Loadable({
	loader: () => import(/* webpackChunkName: "Roles" */"./components/public/team/pages/Roles"),
	loading: Loading,
	delay: 300
});

const TeamRegister = Loadable({
	loader: () => import(/* webpackChunkName: "TeamRegister" */ "./components/public/team/pages/TeamRegister"),
	loading: Loading,
	delay: 300
});

