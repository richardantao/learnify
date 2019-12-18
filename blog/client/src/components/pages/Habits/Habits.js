import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Nav from "../../organisms/Nav/Nav";
import Footer from "../../organisms/Footer";

import "./Habits.scss";

export default class Habits extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Blog</title>
                </Helmet>
                <Nav/>
                <main>

                </main>
                <Footer/>
            </Fragment>
        );
    };
};