import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer";

import "./Danger.scss";

export default class Danger extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Blog</title>
                </Helmet>
                <Header/>
                <main>

                </main>
                <Footer/>
            </Fragment>
        );
    };
};