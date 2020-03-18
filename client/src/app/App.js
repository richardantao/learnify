import React, { Component } from "react";
import { 
    Switch,
    Route,
    Redirect,
    withRouter,
    useHistory,
	useLocation
} from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./actions/auth/auth";
import PropTypes from "prop-types";

import Loadable from "react-loadable";
import Loading from "./components/atoms/Loading";

import store from "../store";

import { Row, Col } from "reactstrap";

import AppNav from "./components/organisms/AppNav";
import AuthNav from "./components/organisms/AuthNav";

import "./App.scss";

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) => 
                true ? (
                    children
                ): (
                <Redirect
                    to={{
                        pathname: "/beta/login",
                        state: { from: location }
                    }}
                />
              )
            }
        
        />
    );
};  

class App extends Component {
    static propTypes = {
        // isAuthenticated: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired
    };

    componentDidMount() {
        store.dispatch(loadUser());
    };

    componentDidUpdate(prevProps) {
        const { } = this.props;
    };

    render () {
        // const { isAuthenticated } = this.props;

        return (
            <Row id="app">
                { true ? 
                    <>
                        <Col
                            xs="1"
                            sm="1"
                            md="1"
                            lg="1"
                            xl="1"
                        >
                            <AppNav/>
                        </Col>
                        <Col
                            xs="11"
                            sm="11"
                            md="11"
                            lg="11"
                            xl="11"
                        >
                            <AuthNav/>
                            <Switch>
                                <Route path="/beta/dashboard" component={Dashboard}/>
                                <Route path="/beta/calendar" component={Calendar}/>
                                <Route path="/beta/academics" component={Academics}/>
                                <Route path="/beta/planner" component={Planner}/>
                                <Route path="/beta/settings" component={Settings}/>
                                <Route path="/beta/help" component={Help}/>
                            </Switch>
                        </Col>
                    </>
                : 
                    <Col>
                        <Switch>
                            <Route path="/beta/register" component={AppRegister}/>
                            <Route path="/beta/signin" component={AppLogin}/>
                            <Route path="/beta/verify-email" component={AppVerify}/>
                            <Route path="/beta/forgot-password" component={AppForgot}/>
                            <Route path="/beta/reset-password" component={AppReset}/>
                        </Switch>
                    </Col>  
                }
            </Row>
        );
    };
};

const AppRegister = Loadable({
	loader: () => import(/* webpackChunkName: "AppRegister" */ "./components/reactors/AppRegister"),
	loading: Loading,
	delay: 300
});

const AppLogin = Loadable({
	loader: () => import(/* webpackChunkName: "AppLogin" */ "./components/reactors/AppLogin"),
	loading: Loading,
	delay: 300
});

const AppVerify = Loadable({
	loader: () => import(/* webpackChunkName: "AppVerify" */ "./components/reactors/AppVerify"),
	loading: Loading,
	delay: 300
});

const AppForgot = Loadable({
	loader: () => import(/* webpackChunkName: "AppForgot" */ "./components/reactors/AppForgot"),
	loading: Loading,
	delay: 300
});

const AppReset = Loadable({
	loader: () => import(/* webpackChunkName: "AppReset" */ "./components/reactors/AppReset"),
	loading: Loading,
	delay: 300
});

const Dashboard = Loadable({
	loader: () => import(/* webpackChunkName: "Dashboard" */ "./components/pages/Dashboard"),
	loading: Loading,
	delay: 300
});

const Calendar = Loadable({
	loader: () => import(/* webpackChunkName: "Calendar" */ "./components/pages/Calendar"),
	loading: Loading,
	delay: 300
});

const Academics = Loadable({
	loader: () => import(/* webpackChunkName: "Academics" */ "./components/pages/Academics"),
	loading: Loading,
	delay: 300
});

const Planner = Loadable({
	loader: () => import(/* webpackChunkName: "Planner" */ "./components/pages/Planner"),
	loading: Loading,
	delay: 300
});

const Settings = Loadable({
	loader: () => import(/* webpackChunkName: "Settings" */ "./components/pages/Settings"),
	loading: Loading,
	delay: 300
});

const Help = Loadable({
	loader: () => import(/* webpackChunkName: "Help" */ "./components/pages/Help"),
	loading: Loading,
	delay: 300
});

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));