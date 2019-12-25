import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../../public/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../public/organisms/Footer";

import "./Api.scss";

export default class Api extends Component {
    render() {
        return(
            <Fragment>
                <Helmet>
                    <title>Learnify | Developers</title>
                </Helmet>
                <Header/>
                <SideNav/>
                <main>

                </main>
                <Footer/>
            </Fragment>
        );
    };
};