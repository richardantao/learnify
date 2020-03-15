import React, { Component } from "react";
import Helmet from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
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
        inventory: [] 
    };

    static propTypes = {

    };

    async componentDidMount() {

    };

    componentDidUpdate(prevProps) {
        
    };

    render() {
        const { } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title>Learnify | Pomodoro</title>
                </Helmet>
                <Row id="beta">
                    <Col>
                        <AppNav/>
                    </Col>
                    <Col>
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

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);