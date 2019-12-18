import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Footer from "../../organisms/Footer";

import "./Status.scss";

export default class Status extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | System Status</title>
                </Helmet>
                <main role="main">
                    <h1>System Status</h1>
                    <div>
                        <hr/>
                    </div>
                    <div>
                        There are no status updates.
                    </div>
                </main>
                <Footer/>
            </Fragment>
        );
    };
};
