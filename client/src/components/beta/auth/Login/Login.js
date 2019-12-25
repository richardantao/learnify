import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { login } from "../../../../actions/auth/auth";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import {
    Alert, Button,
    Form, FormGroup,
    Label, Input
} from 'reactstrap';

import "./Login.scss";

class Login extends Component {
    state = {
        email: "",
        password: "",
        message: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { clearErrors } = this.props;
        
        clearErrors();
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
            if (error.id === "LOGIN_FAILED") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    onChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const { login } = this.props;
        const { email, password } = this.state;

        const user = {
            email: {
                address: email
            },
            password
        };

         // Attempt to login
        login(user);
    };
    
    render() {
       return(
           <Fragment>
               <Helmet>
                   <title>My Learnify | Sign In</title>
               </Helmet>
                    <div id="login">
                            {
                                this.message ? 
                                <Alert className="form-message">{this.message}</Alert> 
                                : null
                            }
                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password"
                                    className= "mb-3"
                                    onChange={this.onChange}
                                />
                                <Button onSubmit={this.onSubmit} color="primary" style={{ marginTop: "2rem" }} block>
                                    Sign in
                                </Button>
                            </FormGroup>
                            <FormGroup>
                                <a href="forget.html" className="forgot">Forgot password?</a>
                            </FormGroup>
                        </Form>
                        <div className="create">
                            <span>Don't have an account?</span>
                            <Button href="/register">Create</Button>
                        </div>
                    </div>
            </Fragment>
       );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { login, clearErrors }

export default connect(mapStateToProps, mapDispatchToProps)(Login);