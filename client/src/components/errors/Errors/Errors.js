import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { returnErrors, clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import "./Errors.scss";

class Errors extends Component {
    state = {
        status: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        returnErrors: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        
    };

    componentDidUpdate() {
        const { error, isAuthenticated } = this.props;
        if(error) {
            this.setState({
                
            });
        } else {
            this.setState({

            });
        };
    };

    render() {
        const { status } = this.state;

        return (
            <Fragment>
                <Helmet>
					<title>My Tutee | Error</title>
				</Helmet>
                <div>

                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { returnErrors, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Errors);