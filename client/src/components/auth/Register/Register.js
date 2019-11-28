import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../../actions/auth/auth.action";
import { clearErrors } from "../../../actions/auth/errors.action";

import { Container } from "react-bootstrap";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
  } from "reactstrap";

import "./Register.scss";

class Register extends Component {
    state = {
        fname: "",
        lname: "",
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

        const { fname, lname, email, password } = this.state;

        const newUser = {
            name: {
                first: fname,
                last: lname
            },
            email: {
                address: email
            },
            password
        };

        console.log("Sending new user to Register action...")
        console.log(newUser);

        // Attempt to register user
        this.props.register(newUser);
    };

    render() {
        return(
            <Fragment>
                <Helmet>
                    <title>My Tutee | Register</title>
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
                                <Label for="fname">First Name</Label>
                                <Input
                                    type="text"
                                    name="fname"
                                    id="fname"
                                    placeholder="Enter first name"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />

                                <Label for="lname">Last Name</Label>
                                <Input
                                    type="text"
                                    name="lname"
                                    id="lname"
                                    placeholder="Enter last name"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    className= "mb-3"
                                    onChange={this.handleChange}
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
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error   
});

const mapDispatchToProps = { register, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Register);