import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "../../atoms/Button";

import "./Notifications.scss";

class Notifications extends Component {
    state = {

    };

    static propTypes = {
        error: PropTypes.object.isRequired
    };

    render() {
        return (
            <>
            
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);