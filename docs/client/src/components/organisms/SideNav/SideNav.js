import React, { Component } from "react";

import "./SideNav.scss";
import { checkPropTypes } from "prop-types";

export default class SideNav extends Component {
    state = {

    };

    componentDidMount() {

    };
    
    showActiveLink = e => {
        
    };

    render() {

        return (
            <header role="banner">
                <nav id="side-nav" style={{height: this.props.siblingHeight}}>
                    <div>
                        <h3>Explore</h3>
                        <a href="/">What is Learnify?</a>
                        <a href="/api">Developers</a>
                        <h3>Resources</h3>
                        <a href="/terms" class="active-page">Terms of Service</a>
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/cookies">Cookie Policy</a>
                        <h3>System</h3>
                        <a href="/changelog">Changelog</a>
                    </div>
                </nav>
            </header>
        );
    };
};


