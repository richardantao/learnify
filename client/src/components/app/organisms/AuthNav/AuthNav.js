import React from "react";

/* Atoms */
import Icon from "../../atoms/Icon";

/* Molecules */
import Search from "../../molecules/Search";

import { Button } from "reactstrap";
import { faCog, faQuestionCircle, faBell } from "@fortawesome/free-solid-svg-icons";

import "./AuthNav.scss";

export default ({ userName }) => {
    return (
        <nav id="auth-nav" role="navigation">
            <Search/>
            <Button>
                <Icon icon={faQuestionCircle}/>
            </Button>
            <Button>
                <Icon icon={faCog}/>
            </Button>
            <Button>
                <Icon icon={faBell}/>
            </Button>
            <span>
                {userName}
            </span>
        </nav>
    );
};