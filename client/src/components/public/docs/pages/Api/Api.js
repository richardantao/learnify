import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import "../../Docs.scss";

export default class Api extends Component {
    state = {
        
    };

    componentDidMount() {
        
    };

    render() {
        return(
            <>
                <Helmet>
                    <title>Learnify | Developers</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <SideNav/>
                    <main className="docs" role="main">

                    </main>
                    <Footer/>
                </div>
            </>
        );
    };
};