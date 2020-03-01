import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { register } from "../../../../actions/auth/auth";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import {
    Container, 
    Alert, Button, 
    Form, FormGroup, Label, Input
} from "reactstrap"; 

class AppRegister extends Component {
    state = {
        first: "",
        last: "",
        email: "",
        password: "",
        message: null
    };
    
    static propTypes = {
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === "REGISTER_FAILED") {
                this.setState({ message: error.message });
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

        const { first, last, email, password } = this.state;
        const { register } = this.props;

        const user = {
            name: {
                first,
                last
            },
            email: {
                address: email
            },
            password
        };

        console.log("Sending new user to Register action...")
        console.log(user);

        // Attempt to register user
        register(user);
    };

    render() {
        const { first, last, email, password, message } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title>My Learnify | Register</title>
                </Helmet>
                <Container>
                    <div id="register">
                        { message === "" ? <Alert color="success">{message}</Alert>
                        : message ? <Alert color="danger">{message}</Alert> 
                        : null }
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="first">First Name</Label>
                                <Input
                                    type="text"
                                    name="first"
                                    id="first"
                                    value={first}
                                    placeholder="eg. John"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="last">Last Name</Label>
                                <Input
                                    type="text"
                                    name="last"
                                    id="last"
                                    value={last}
                                    placeholder="eg. Doe"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    placeholder="eg. johndoe@example.com"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    className= "mb-3"
                                    onChange={this.handleChange}
                                    required
                                />
                                <Button type="submit" color="primary" style={{ marginTop: "2rem" }} block>
                                    Register
                                </Button>
                            </FormGroup>
                            <FormGroup>
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else. 
                                By registering an account with Learnify you agree to 
                                our <a href="terms.html" target="_blank">Terms of Service</a> and 
                                <a href="privacy.html" target="_blank"> Privacy Policy</a>.
                            </small>
                            </FormGroup>
                        </Form>
                    </div>
                </Container>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error   
});

const mapDispatchToProps = { register, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AppRegister);