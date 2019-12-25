import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer";

import "./Habits.scss";

export default class Habits extends Component {
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