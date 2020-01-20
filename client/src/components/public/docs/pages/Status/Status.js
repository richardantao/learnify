import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import "../../Docs.scss";

export default class Status extends Component {
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
                    <meta name="description" content="Learnify's system status logs."/>
                    <meta name="keywords" content="Learnify, status, system, logs, maintenance"/>
                    <link rel="canonical" href="https://learnify.ca/docs/status"/>
                    <title>Learnify | System Status</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <SideNav siblingHeight={childHeight}/>
                    <main className="docs" role="main" ref={ (mainElement) => { this.mainElement = mainElement } }>
                        <h1>System Status</h1>
                        <div>
                            <p>There are no status updates.</p>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </>
        );
    };
};
