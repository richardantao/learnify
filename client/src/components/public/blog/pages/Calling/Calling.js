import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "./Calling.scss";

export default class Calling extends Component {
    state = {

    };

    componentDidMount() {
        
    };

    render() {
        return (
            <Fragment>
                <Helmet>

                </Helmet>
                <div id="public">
                    <Header/>
                    <main className="blog" role="main">

                    </main>
                    <Footer/>
                </div>
            </Fragment>
        );
    };  
};

