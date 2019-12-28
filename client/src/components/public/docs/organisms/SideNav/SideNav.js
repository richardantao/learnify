import React, { Component } from "react";

import "../../Docs.scss";

export default class SideNav extends Component {
    state = {
        
    };

    componentDidMount() {
    
    };

    render() {

        return (
            <header role="banner">
                <nav className="side-nav" style={{height: this.props.siblingHeight}}>
                    <div>
                        <h3>Explore</h3>
                            <a href="/docs">What is Learnify?</a>
                            <a href="/docs/api">Developers</a>
                        <h3>Resources</h3>
                            <a href="/docs/terms">Terms of Service</a>
                            <a href="/docs/privacy">Privacy Policy</a>
                            <a href="/docs/cookies">Cookie Policy</a>
                        <h3>System</h3>
                            <a href="/docs/changelog">Changelog</a>
                    </div>
                </nav>
            </header>
        );
    };
};


