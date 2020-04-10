import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { logErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

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
                        <title>Learnify | 400 Bar Request Error</title>
                    </Helmet>
                    <main role="main">
                        {message}
                    </main>
                </>
            );
        } else return children;
    };
};

const mapStateToProps = state => ({
    message: state.error.message.message
});

const mapDispatchProps = { logErrors };

export default connect(mapStateToProps, mapDispatchProps)(ErrorBoundary);