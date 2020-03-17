import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { requestPasswordReset } from "../../../actions/auth/auth";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Container, Col, Row,
    Form, Label, Input
 } from "reactstrap";

class AppForgot extends Component {
    state = {
        email: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        requestPasswordReset: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "PASSWORD_RESET_REQUEST_FAILED") {
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
        const { requestPasswordReset } = this.props;

        requestPasswordReset(email);
    };

    render() {
        const { email, message } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title>Learnify | Reset Password</title>
                </Helmet>
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmits}>
                                { message ? <Alert color="danger">{message}</Alert> : null}
                                <Label for="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={email}
                                    placeholder="Email.."
                                    required
                                />
                                <Button type="submit">Reset Password</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { requestPasswordReset, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AppForgot);