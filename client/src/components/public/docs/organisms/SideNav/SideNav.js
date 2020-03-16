import React, { Component } from "react";
import { Link } from "react-router-dom";

import Loadable from "react-loadable";
// import Loading from "../../../global/organisms/Loading";

import "../../Docs.scss";

const SideOverlay = Loadable({
    loader: () => import(/* webpackChunkName: "SideOverlay" */ "../SideOverlay"),
    // loading: Loading,
    loading: () => <div></div>, // change to Loading component once bad performance
    delay: 500
});

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
                                    <Link to="/docs">What is Learnify?</Link>
                                    {/* <Link to="/docs/developers">Developers</Link> */}
                                <h3>Resources</h3>
                                    <Link to="/docs/terms">Terms of Service</Link>
                                    <Link to="/docs/privacy">Privacy Policy</Link>
                                    <Link to="/docs/cookies">Cookie Policy</Link>
                                    <Link to="/docs/sitemap">Sitemap</Link>
                                <h3>System</h3>
                                    <Link to="/docs/changelog">Changelog</Link>
                                    <Link to="/docs/status">Status</Link>
                            </>
                        }
                    </div>
                </nav>
            </header>
        );
    };
};


