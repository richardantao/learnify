import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { logErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Container } from "reactstrap";

import "./ErrorBoundary.scss";

class ErrorBoundary extends Component {
    state = {
        hasError: false
    };

    static propTypes = {
        logErrors: PropTypes.func.isRequired
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    };

    componentDidCatch(error, errorInfo) {
       logErrors(error, errorInfo);
    };

    render() {
        const { hasError } = this.state;
        const { children, message } = this.props;
        
        if(hasError) {
            return (
                <>
                    <Helmet>
                        <meta name="" content=""/>
                        <meta name="" content=""/>
                        <title>Learnify | 400 Bad Request Error</title>
                    </Helmet>
                    <Container id="error">
                        An error occurred. Please reload the page.
                    </Container>
                </>
            );
        } else return children;
    };
};

const mapStateToProps = state => ({
    error: state.error.message.message
});

const mapDispatchProps = { logErrors };

export default connect(mapStateToProps, mapDispatchProps)(ErrorBoundary);