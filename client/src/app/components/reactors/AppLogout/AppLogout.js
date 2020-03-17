import React, { Component } from "react";

import { logout } from "../../../actions/auth/auth";
import { connect } from "react-redux"; 
import PropTypes from "prop-types";

import Button from "../../atoms/Button";


class AppLogout extends Component {
    state = {

    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    handleAllLogouts = e => {
        const { logout } = this.props;

        logout();
        googleSignOut(); 
    };

    googleSignOut = () => {
        const auth2 = gapi.auth2.getAuthInstance();

        auth2.signOut();   
    };

    render() {
        return <Button href="#signout" onClick={this.handleAllLogouts} content="Sign Out"/>
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(AppLogout);


