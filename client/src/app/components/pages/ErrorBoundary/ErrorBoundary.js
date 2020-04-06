import React, { Component } from "react";

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
        const { children } = this.props;
        
        if(hasError) {
            return (
                <main role="main">
                    
                </main>
            );
        } else return children;
    };
};

const mapStateToProps = state => ({
    
});

const mapDispatchProps = { logErrors };

export default connect(mapStateToProps, mapDispatchProps)(ErrorBoundary);