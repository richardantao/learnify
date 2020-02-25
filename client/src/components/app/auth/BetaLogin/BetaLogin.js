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

import "./BetaLogin.scss";

class BetaLogin extends Component {
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

        /* Facebook SDK */
        
        // initialize FB SDK
        // window.fbAsyncInit = function() {
        //     FB.init({
        //         appId      : "571380723442823",
        //         cookie     : true,
        //         xfbml      : true,
        //         version    : "5.0"
        //     });
                
        //     FB.AppEvents.logPageView();   
            
        //     // check user's login status
        //     FB.getLoginStatus(function(response) {
        //         statusChangeCallback(response);
        //     }).bind(this);
        // }.bind(this);

        // (function(d, s, id){
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) {return;}
        //     js = d.createElement(s); js.id = id;
        //     js.src = "https://connect.facebook.net/en_US/sdk.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        // }(document, "script", "facebook-jssdk"));
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
       return (
           <Fragment>
               <Helmet>
                    <meta name="description" content="Signin to the Beta Learnify app."/>
                    <meta name="keywords" content="Learnify, beta, signin, login, auth"/>
                    <meta name="google-signin-client_id" content="1040228589350-rh2pv9s8pqeo3qrqutgvqt1pbng7g4s8.apps.googleusercontent.com"></meta>
                    <link rel="canonical" href="https://learnify.ca/beta/signin"/>
                    <title>My Learnify | Sign In</title>
                    <script src="https://apis.google.com/js/platform.js" async defer></script>
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
                            <FormGroup>
                                <div class="fb-login-button" data-size="medium" data-auto-logout-link="true" data-onlogin="checkLoginState();"></div>
                                <div class="g-signin2" data-onsuccess="onSignIn"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BetaLogin);