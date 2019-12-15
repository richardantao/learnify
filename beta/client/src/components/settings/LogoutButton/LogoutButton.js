import React, { Component } from "react";

import { logout } from "../../../actions/auth/auth.action";
import { connect } from "react-redux"; 
import PropTypes from "prop-types";

import Button from "../Button";

import "./LogoutButton.scss";

class LogoutButton extends Component {
    state = {

    };
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
    
    render() {
        return <Button href="#" onClick={this.props.logout}>Sign Out</Button>
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

