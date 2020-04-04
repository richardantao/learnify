import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    state = {
        hasError: false
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    };

    componentDidCatch(error, errorInfo) {
        // logErrorToMyService(error, errorInfo); // define service to send to  
    };

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        
        if(hasError) {
            return 
        } else return children;
    };
};