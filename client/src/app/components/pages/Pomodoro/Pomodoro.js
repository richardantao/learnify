import React, { Component } from "react";
import Helmet from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

// Organisms
import AppNav from "../../organisms/AppNav";
import AuthNav from "../../organisms/AuthNav";
import List from "../../organisms/List";

import { Row, Col } from "reactstrap";

import "./Pomodoro.scss";

class Pomodoro extends Component {
    state = {
        todos: [],
        inventory: [],
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    async componentDidMount() {
        const { clearErrors } = this.props;
        await clearErrors();
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

    render() {
        const { message } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title>Learnify | Pomodoro</title>
                </Helmet>
                <Row id="beta">
                    <Col
                        xs="1"
                        sm="1"
                        md="1"
                        lg="1"
                        xl="1"
                    >
                        <AppNav/>
                    </Col>
                    <Col
                        xs="11"
                        sm="11"
                        md="11"
                        lg="11"
                        xl="11"
                    >
                        <AuthNav/>

                    </Col>
                </Row>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
}); 

const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);