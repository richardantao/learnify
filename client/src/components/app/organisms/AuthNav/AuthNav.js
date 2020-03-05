import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "reactstrap";
import { faCog, faQuestionCircle, faBell } from "@fortawesome/free-solid-svg-icons";

/* Atoms */
import Icon from "../../atoms/Icon";

/* Molecules */
import Search from "../../molecules/Search";

/* --- Organisms --- */
import Notifications from "../Notifications";

import "./AuthNav.scss";

class AuthNav extends Component {
    state = {
        userName: ""
    };

    static propTypes = {

    };

    render() {
        const { userName } = this.state;

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
                    <Notifications/>
                </Button>
                <span>
                    {userName}
                </span>
            </nav>
        );
    }
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(AuthNav);