import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faQuestionCircle, faBell } from "@fortawesome/free-solid-svg-icons";

import { Button } from "reactstrap";

import Search from "../Search";

import "./AuthNav.scss";

const AuthNav = props => {
    return (
        <nav id="auth-nav" role="navigation">
            <Search/>
            <Button href="/beta/help">
                <FontAwesomeIcon icon={faQuestionCircle}/>
            </Button>
            <Button href="/beta/settings">
                <FontAwesomeIcon icon={faCog}/>
            </Button>
            <Button href="/beta/notifcations">
                <FontAwesomeIcon icon={faBell}/>
            </Button>
            <span>
                *User's first name*
            </span>
        </nav>
    );
};

export default AuthNav;