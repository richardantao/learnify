import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer";

import "./Mission.scss";

export default class Mission extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Blog</title>
                </Helmet>
                <Header/>
                <main>
                    talk about what I've observed in friends my age.
                    why its far from the ideal
                    what we hope to achieve
                </main>
                <Footer/>
            </Fragment>
        );
    };
};