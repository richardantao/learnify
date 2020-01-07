import React, { Component } from "react";

import Loadable from "react-loadable";
import Loading from "../Loading";

import logo from "./learnify-min.jpg";
import "./Header.scss";

const Overlay = Loadable({
    loader: () => import(/* webpackChunkName: "Overlay" */ "../Overlay"),
    loading: Loading,
    delay: 300
});

export default class Header extends Component {
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
                <nav id="nav" role="navigation">
                    <a href="/">
                        <img src={logo} id="logo" alt="Learnify logo"/>
                    </a>

                    <div className="nav-links">
                    { hamburger ? (
                        <Overlay/>
                    ):  <>
                            <a href="/about">About</a>
                            <a href="/team">Team</a>
                            <a href="/blog">Blog</a>
                            <a href="/contact">Contact</a>
                        </>
                    }
                    </div>                
                </nav>
            </header>
        );
    };
};