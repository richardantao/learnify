import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { } from "../../../../actions/auth/auth";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Container, Col, Row,
    Form, Label, Input, Button
 } from "reactstrap";

class AppForgot extends Component {
    state = {
        email: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
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
        e.preventDefault();

        const { email } = this.state;
        const { } = this.props;


    };

    render() {
        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title> Learnify | Reset Password</title>
                </Helmet>
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmits}>
                                <Label for="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    // value={}
                                    placeholder="Email.."
                                    required
                                />
                                <Button type="submit">Reset Password</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AppForgot);