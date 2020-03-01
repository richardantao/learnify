import React, { Component } from "react";

import { connect } from "react-redux";
import { verifyEmail } from "../../../../actions/auth/auth";
import PropTypes from "prop-types";

import { Container, Form, Label, Input, Button } from "reactstrap";

class AppVerify extends Component {
    state = {
        email: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        verifyEmail: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    componentDidUpdate() {
        
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { email } = this.state;
        const { } = this.props;

        
    };
    
    render() {
        const { email, message } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="" content=""/>
                    <meta name="" content=""/>
                    <title>Email Verification</title>
                </Helmet>
            </>
        );
    };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(AppVerify);