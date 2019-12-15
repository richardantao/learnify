import React, { Component } from "react";

import "./Header.scss";

export default class Header extends Component {
    render() {
        return (
            <header role="banner">
                <nav id="nav" role="navigation">
                    <img src="assets/icons/learnify-min.jpg" id="logo" alt="Learnify logo"/>
                    {/* <a href="/contact">Contact</a> */}
                    {/* <a href="https://blog.learnify.ca">Blog</a> */}
                    {/* <a href="/about">About</a> */}
                    {/* <a href="/home">Home</a> */}
                </nav>
            </header>
        );
    };
};