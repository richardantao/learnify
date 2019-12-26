import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import "./Status.scss";

export default class Status extends Component {
    state = {

    };

    componentDidMount() {
        
    }; 

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | System Status</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <main className="docs" role="main">
                        <h1>System Status</h1>
                        <div>
                            <hr/>
                        </div>
                        <div>
                            There are no status updates.
                        </div>
                    </main>
                    <Footer/>
                </div>
            </Fragment>
        );
    };
};
