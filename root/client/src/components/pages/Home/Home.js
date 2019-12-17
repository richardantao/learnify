import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import { postInvite } from "../../../actions/beta";
import { clearErrors } from "../../../actions/errors";
import PropTypes from "prop-types";

import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";

import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

import "./Home.scss";

class Home extends Component {
    state = {
        name: "",
        email: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        beta: PropTypes.object.isRequired,
        postInvite: PropTypes.func.isRequired
    };

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    };

    handleReset = e => {
        e.preventDefault();

        // clear errors
        this.props.clearErrors();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, email } = this.state;

        const beta = {
            name,
            email
        };

        // pass data to API
        this.props.postInvite(beta);

        // reset form fields
        this.setState({
            name: "",
            email: ""
        });
    };

    render() {
        const { name, email, message } = this.state;
        
        return (
            <Fragment>
                <Helmet>    
                    <meta charset="UTF-8"/>
                    <meta name="application-name" content="Learnify"/>
                    <meta name="author" content="Richard Antao"/>
                    <meta name="description" content="Learnify helps you organize your academic life with our intuitive all-in-one web application"/>
                    <meta name="keywords" content="Learnify, homework, app, study app, homework app, university app, planner, study planner, highschool"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Learnify</title>
                </Helmet>
                <Header/>
                <main role="home-main">
                    <img src="assets/images/home-min.jpg" className="home-background" alt=""/>
                    <div className="home-pitch">
                        <h3>Building the Foundations for Student Sucess</h3>
                        <p>
                            Sign up for the beta program to have a successful school year right at your finger tips. 
                            Academic excellence has never been this simple.
                        </p>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="beta-form" role="form">
                        { message ? (
                            <Alert color="danger">{message}</Alert>
                        ) : message === `An email confirmation of your invite has been sent to ${email}` ? (
                            <Alert color="success">{message}</Alert>  
                        ) : null }
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                name="name" 
                                type="text" 
                                placeholder="Jane Doe" 
                                value={name}
                                required
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input 
                                name="email" 
                                type="email" 
                                placeholder="janedoe@example.com" 
                                value={email}
                                required
                                onChange={this.handleChange}
                            />
                            <small className="emailHelp form-text text-muted">We'll never share your email with anyone else. 
                            By requesting an invite you agree to our <a href="https://docs.learnify.ca/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="https://docs.learnify.ca/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</small>
                        </FormGroup>
                        <FormGroup>
                            <Button className="form-reset" type="reset" onClick={this.handleReset}>Reset Form</Button>
                            <Button className="form-submit" type="submit">Request Beta Invite</Button>
                        </FormGroup>
                    </Form>
                </main>
                <Footer/>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    beta: state.beta,
    error: state.error
});

const mapDispatchToProps = { postInvite, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Home);