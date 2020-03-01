import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Container, Col, Row } from "reactstrap";


class AppReset extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title> Learnify | Reset Password</title>
                </Helmet>
                <Container>


                </Container>
            </>
        )
    };
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppReset);