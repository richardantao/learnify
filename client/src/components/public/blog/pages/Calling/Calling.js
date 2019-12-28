import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "../../Blog.scss";

export default class Calling extends Component {
    state = {

    };

    componentDidMount() {
        
    };

    render() {
        return (
            <>
                <Helmet>

                </Helmet>
                <div id="public">
                    <Header/>
                    <main className="posts" role="main">

                    </main>
                    <Footer/>
                </div>
            </>
        );
    };  
};

