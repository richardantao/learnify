import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import "../../Docs.scss";

export default class Developers extends Component {
    state = {
        childHeight: 0
    };

    componentDidMount() {
        const childHeight = this.mainElement.clientHeight;

        this.setState({
            childHeight
        });
    };

    componentDidUpdate(prevProps, prevState) {
        // const { childHeight } = this.state;
        // if(childHeight !== prevState.childHeight) {

        // };

        setTimeout(() => {
            const childHeight = this.mainElement.clientHeight;

            this.setState({
                childHeight
            });
        }, 1000);
    };

    render() {
        const { childHeight } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <title>Learnify | Developers</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <SideNav/>
                    <main className="docs" role="main" ref={ (mainElement) => { this.mainElement = mainElement } }>
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