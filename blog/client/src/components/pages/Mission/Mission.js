import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Nav from "../../organisms/Nav/Nav";
import Footer from "../../organisms/Footer";

import "./Mission.scss";

export default class Mission extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Blog</title>
                </Helmet>
                <Nav/>
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