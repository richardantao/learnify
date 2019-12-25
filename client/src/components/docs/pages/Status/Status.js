import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../../public/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../public/organisms/Footer";

import "./Status.scss";

export default class Status extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | System Status</title>
                </Helmet>
                <Header/>
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
