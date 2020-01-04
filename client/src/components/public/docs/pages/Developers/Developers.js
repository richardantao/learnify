import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import "../../Docs.scss";

export default class Developers extends Component {
    state = {
        
    };

    componentDidMount() {
        alert("This webpage is a work in progress.");
    };

    render() {
        return (
            <>
                <Helmet>
                    <title>Learnify | Developers</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <SideNav/>
                    <main className="docs" role="main">
                        <h1>Developers</h1>
                        <section id="resources">
                            <h2>Resource Description</h2>
                            
                        </section>
                        <section id="endpoints">
                            <h2>Endpoints and Methods</h2>
                        
                        </section>
                        <section id="parameters">
                            <h2>Parameters</h2>
                        
                        </section>
                        <section id="request">
                            <h2>Request Example</h2>
                        
                        </section>
                        <section id="response">
                            <h2>Response Example and Schema</h2>
                        
                        </section>
                    </main>
                    <Footer/>
                </div>
            </>
        );
    };
};