import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { register } from "../../../../actions/auth/auth";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";


import {
    Container, 
    Alert, Button, 
    Modal, ModalHeader, ModalBody, ModalFooter,
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

    componentDidMount() {
        this.props.clearErrors();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === "REGISTER_FAILED") {
                this.setState({ message: error.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { first, last, email, password } = this.state;
        const { register } = this.props;

        const newUser = {
            name: {
                first: first,
                last: last
            },
            email: {
                address: email
            },
            password
        };

        console.log("Sending new user to Register action...")
        console.log(newUser);

        // Attempt to register user
        register(newUser);
    };

    render() {
        const { } = this.state;

        return (
            <>
                <Helmet>
                    <title>My Learnify | Register</title>
                </Helmet>
                <Container>
                    <div id="register">
                        {
                            this.message ? 
                            <Alert className="form-message">{this.message}</Alert> 
                            : null
                        }
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="first">First Name</Label>
                                <Input
                                    type="text"
                                    name="first"
                                    id="first"
                                    placeholder="Enter first name"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="last">Last Name</Label>
                                <Input
                                    type="text"
                                    name="last"
                                    id="last"
                                    placeholder="Enter last name"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
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
                                By registering an account with Tutee you agree to 
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