import React from "react";

import Loadable from "react-loadable";

import logo from "./learnify-min.jpg";
import "./Header.scss";

const Overlay = Loadable({
    loader: () => import(/* webpackChunkName: "Overlay" */ "../Overlay"),
    loading: () => <div></div>,
    delay: 500
});

const Header = () => {
    return (
        <header role="banner">
            <nav id="nav" role="navigation">
                <a href="/">
                    <img src={logo} id="logo" alt="Learnify logo"/>
                </a>

                <div className="nav-links">
                    <Overlay/> 
                    <a href="/about">About</a>
                    <a href="/team">Team</a>
                    <a href="/blog">Blog</a>
                    <a href="/contact">Contact</a>
                </div>                
            </nav>
        </header>
    );
};

export default Header;