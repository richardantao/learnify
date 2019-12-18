import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import TopNav from "../../organisms/TopNav";
import SideNav from "../../organisms/SideNav";
import Footer from "../../organisms/Footer";

import "./Api.scss";

export default class Api extends Component {
    render() {
        return(
            <Fragment>
                <Helmet>
                    <title>Learnify | Developers</title>
                </Helmet>
                <TopNav/>
                <SideNav/>
                <main>

                </main>
                <Footer/>
            </Fragment>
        );
    };
};