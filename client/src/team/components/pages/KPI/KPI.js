import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

class KPI extends Component {
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

export default connect()(KPI);