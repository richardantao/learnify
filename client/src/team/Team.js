import React, { Component } from "react";
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "./components/pages/Dashboard";
import KPI from "./components/pages/KPI";
import NotFound from "./components/pages/NotFound";

import "./Team.scss";

class Team extends Component {
    static propTypes = {

    };

    componentDidUpdate(prevProps) {
        const { } = this.props; 
    };

    render() {

            
        return (
            <Switch>
                <Route path="/team/dashboard" component={Dashboard}/>
                <Route path="/team/kpi" component={KPI}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        );
    };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Team));