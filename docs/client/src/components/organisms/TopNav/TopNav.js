import React, { Component } from "react";

import logo from "./learnify-min.jpg";
import "./TopNav.scss";

export default class TopNav extends Component {
    state = {

    };

    render() {
        return (
            <header role="banner">
                <nav id="nav" role="navigation">
                    <img src={logo} id="logo" alt="Learnify logo"/>
                    <a href="https://learnify.ca/contact">Contact</a>
                    <a href="https://blog.learnify.ca/">Blog</a>
                    <a href="https://team.learnify.ca/">Team</a>
                    <a href="https://learnify.ca/about">About</a>
                    <a href="https://learnify.ca/">Home</a>
                </nav>
            </header>
        );
    };
};
