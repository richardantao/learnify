import React, { Component } from "react";

import SideOverlay from "../SideOverlay";

import "../../Docs.scss";

export default class SideNav extends Component {
    state = {
        hamburger: false,
        width: window.innerWidth
    };

    trackWindowWidth = () => {
        this.setState({
            width: window.innerWidth
        });
    };

    componentDidMount() {
        const { width } = this.state;
        window.addEventListener("resize", this.trackWindowWidth);

        if(width < 768) {
            this.setState({
                hamburger: true
            });
        } else {
            this.setState({
                hamburger: false
            });
        };
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.trackWindowWidth);
    };

    componentDidUpdate(prevProps, prevState) {
        const { width } = this.state;

        if(width !== prevState.width) {
            if(width < 768) {
                this.setState({
                    hamburger: true
                });
            } else {
                this.setState({
                    hamburger: false
                });
            };
        }; 
    };

    render() {
        const { hamburger } = this.state;

        return (
            <header role="banner">
                <nav className="side-nav" style={{height: this.props.siblingHeight}}>
                    <div>
                        { hamburger ? (
                            <SideOverlay/>
                        ):
                            <>
                                <h3>Explore</h3>
                                    <a href="/docs">What is Learnify?</a>
                                    <a href="/docs/api">Developers</a>
                                <h3>Resources</h3>
                                    <a href="/docs/terms">Terms of Service</a>
                                    <a href="/docs/privacy">Privacy Policy</a>
                                    <a href="/docs/cookies">Cookie Policy</a>
                                    <a href="/docs/sitemap">Sitemap</a>
                                <h3>System</h3>
                                    <a href="/docs/changelog">Changelog</a>
                                    <a href="/docs/status">Status</a>
                            </>
                        }
                    </div>
                </nav>
            </header>
        );
    };
};


