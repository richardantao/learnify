import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import { postContact } from "../../../actions/contact";
import { clearErrors } from "../../../actions/errors";
import PropTypes from "prop-types";

import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";

import "./Contact.scss";

class Contact extends Component {
    state = {
        name: "",
        email: "",
        message: ""
    };

    static propTypes = {
        contact: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postContact: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        // grab fields from state
        const { name, email, message } = this.state;

        const contact = {
            name,
            email,
            message
        };

        console.log(contact);

        // pass data to API
        this.props.postContact(contact);

        // reset form fields
        this.setState({
            name: "",
            email: "",
            message: ""
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
                    <title>Learnify | Contact Us</title>
                </Helmet>
                <Header/>
                <main role="contact-main">
                    <img src="assets/images/contact-min.jpg" className="contact-background" alt=""/>
                    <div className="contact-pitch">
                        <h3>Have a question? Send us a message.</h3>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="contact-form">
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                name="name" 
                                type="text" 
                                placeholder="John Doe"
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
                                placeholder="johndoe@example.com" 
                                value={email}
                                required
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="message">Message</Label>
                            <Input
                                name="message" 
                                type="textarea"
                                value={message}
                                placeholder="Type your message here.." 
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button className="form-reset" type="reset">Reset Form</Button>
                            <Button className="form-submit" type="submit">Submit Message</Button>
                        </FormGroup>
                    </Form>
                </main>
                <Footer/>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    contact: state.contact,
    error: state.error
});

const mapDispatchToProps = { postContact, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

