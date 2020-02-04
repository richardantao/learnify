import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

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