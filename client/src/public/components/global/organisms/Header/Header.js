import React from "react";
import { Link } from "react-router-dom";

import Loadable from "react-loadable";

import logo from "./learnify-min.jpg";
import "./Header.scss";

const Overlay = Loadable({
    loader: () => import(/* webpackChunkName: "Overlay" */ "../Overlay"),
    loading: () => <div></div>,
    delay: 500
});

export default () => {
    return (
        <header role="banner">
            <nav id="nav" role="navigation">
                <Link to="/" className="btn">
                    <img src={logo} id="logo" alt="Learnify logo"/>
                </Link>

                <div className="nav-links">
                    <Overlay/> 
                    <Link to="/about" className="btn">About</Link>
                    <Link to="/team" className="btn">Team</Link>
                    <Link to="/blog" className="btn">Blog</Link>
                    <Link to="/contact" className="btn">Contact</Link>
                </div>                
            </nav>
        </header>
    );
};