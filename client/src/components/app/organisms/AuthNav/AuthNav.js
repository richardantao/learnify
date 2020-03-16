import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col } from "reactstrap";
import { faCog, faQuestionCircle, faUser } from "@fortawesome/free-solid-svg-icons";

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
        error: PropTypes.object.isRequired
    };

    render() {
        const { userName } = this.state;

        return (
            <nav id="auth-nav" role="navigation">
                <Row>
                    <Col className="search-bar">
                        <Search/>
                    </Col>
                    <Col className="auth-links">
                        <Link to="#account" className="btn">
                            {userName}
                            <Icon icon={faUser}/>
                        </Link>
                        <Link to="#notifications" className="btn">
                            <Notifications/>
                        </Link>
                        <Link to="/beta/settings" className="btn" >
                            <Icon icon={faCog}/>
                        </Link>
                        <Link to="/beta/help" className="btn">
                            <Icon icon={faQuestionCircle}/>
                        </Link>
                    </Col>
                </Row>
            </nav>
        );
    }
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(AuthNav);