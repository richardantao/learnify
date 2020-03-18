import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

class Dashboard extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <meta/>
                    <meta/>
                    <title></title>
                </Helmet>
            </>
        );
    };
};

export default connect()(Dashboard);