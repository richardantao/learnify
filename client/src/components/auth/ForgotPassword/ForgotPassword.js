import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Container, Col, Row } from "react-bootstrap";

import "./ForgotPassword";

class ForgotPassword extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title> Learnify | Reset Password</title>
                </Helmet>
                <Container>


                </Container>
            </Fragment>
        )
    };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);