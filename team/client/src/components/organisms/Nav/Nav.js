import React, { Component } from "react";

import "./Nav.scss";

export default class Nav extends Component {
    state = {

    };

    componentDidMount() {

    };

    render() {
        return (
            <header role="banner">
                <nav id="nav" role="navigation">
                    <img src="assets/icons/learnify-min.jpg" id="logo" alt="Learnify logo"/>
                    <a href="https://learnify.ca/contact">Contact</a>
                    <a href="https://blog.learnify.ca/">Blog</a>
                    <a href="/">Team</a>
                    <a href="https://learnify.ca/about">About</a>
                    <a href="https://learnify.ca/">Home</a>
                </nav>
            </header>
        );
    };
};