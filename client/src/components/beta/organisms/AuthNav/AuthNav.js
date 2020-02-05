import React from "react";

/* Icons */
import FaCog from "../../icons/FaCog";
import FaQuestionCircle from "../../icons/FaQuestionCircle";
import FaBell from "../../icons/FaBell";

/* Atoms */
import Button from "../../atoms/Button";

import Search from "../global/Search";

import "./AuthNav.scss";

export default ({ userName }) => {
    return (
        <nav id="auth-nav" role="navigation">
            <Search/>
            <Button type="button" href="/beta/help" content={<FaQuestionCircle/>} />
            <Button type="button" href="/beta/settings" content={<FaCog/>} />
            <Button type="button" href="/beta/notifcations" content={<FaBell/>} />
            <span>
                {userName}
            </span>
        </nav>
    );
};