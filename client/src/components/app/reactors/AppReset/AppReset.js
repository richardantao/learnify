import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { resetPassword } from "../../../../actions/auth/auth";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Container, Col, Row } from "reactstrap";

class AppReset extends Component {
    state = {
        change: "",
        confirm: ""
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        resetPassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    handleSubmit = e => {
        e.preventDEfault();

        const { change, confirm } = this.state;
        const { resetPassword } = this.props; 

        resetPassword({ change, confirm });
    };

    render() {
        return (
            <>
                <Helmet>
                    <meta/>
                    <meta/>
                    <title> Learnify | Reset Password</title>
                </Helmet>
                <Container>


                </Container>
            </>
        )
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { resetPassword, clearErrors};

export default connect(mapStateToProps, mapDispatchToProps)(AppReset);