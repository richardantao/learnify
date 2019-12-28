import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "../../Blog.scss";

export default class Tips extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Learnify | Blog</title>
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