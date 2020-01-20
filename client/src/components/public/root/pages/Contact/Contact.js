import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import { postContact } from "../../../../../actions/root/contact";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import background from "./contact-min.jpg"
import "../../Root.scss";

class Contact extends Component {
    state = {
        name: "",
        email: "",
        text: "",
        message: null,
        success: null
    };

    static propTypes = {
        contact: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postContact: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { contact, error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "CONTACT_ERROR") {
                this.setState({
                    message: error.message.message,
                    success: false
                });   
            } else {
                this.setState({
                    message: null,
                    success: null
                });
            };
        };

        if(contact !== prevProps.contact) {
            if(contact.message) {
                this.setState({
                    message: contact.message.message,
                    success: true
                });
            } else {
                this.setState({
                    message: null,
                    success: null
                });
            };
        };
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleReset = e => {
        e.preventDefault();

        const { clearErrors } = this.props;

        clearErrors();

        this.setState({
            name: "",
            email: "",
            text: "",
            message: null,
            success: null
        });        
    };

    handleSubmit = e => {
        e.preventDefault();

        // grab fields from state
        const { postContact } = this.props;
        const { name, email, text } = this.state;

        const contact = {
            name,
            email,
            text
        };

        // pass data to API
        postContact(contact);

        // reset form fields
        this.setState({
            name: "",
            email: "",
            text: ""
        });
    };
    
    render() {
        const { name, email, text, message, success } = this.state;
        const isEnabled = name.length > 2 && email.length > 5 && text.length > 14 && regex.test(email);

        const textLeft = 15 - text.length;

        return (
            <>
                <Helmet>
                    <meta name="description" content="Learnify helps you organize your academic life with our intuitive all-in-one web application"/>
                    <meta name="keywords" content="Learnify, message, contact, customer, service, support, send, homework, study, planner, academics"/>
                    <link rel="canonical" href="https://learnify.ca/contact"/>
                    <title>Learnify | Contact Us</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <main className="root contact" role="main">
                        <img src={background} className="contact-background" type="image/jpeg" alt="Student walking home"/>
                        <div className="contact-pitch">
                            <h1>Have a question? Send us a message.</h1>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="contact-form">
                            {   message && success ? (
                                <Alert color="success">{message}</Alert>
                            ):  message && !success ? (
                                <Alert color="danger">{message}</Alert>
                            ):  null }
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
                                { name.length === 1 ? (
                                    <small className="warning">
                                        2 characters left.
                                    </small>
                                ) : name.length === 2 ? (
                                    <small className="warning">
                                        1 character left.
                                    </small>
                                ) : null } 
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
                                {email.length > 5 && !regex.test(email) ? (
                                <small className="warning">
                                    Email must be a valid email address
                                </small> 
                                ) : null}
                            </FormGroup>
                            <FormGroup>
                                <Label for="message">Message</Label>
                                <Input
                                    name="text" 
                                    type="textarea"
                                    value={text}
                                    placeholder="Type your message here.." 
                                    required
                                    onChange={this.handleChange}
                                />
                                { text.length > 0 && text.length < 14 ? (
                                    <small className="warning">
                                        {textLeft} characters left.
                                    </small>
                                ) : text.length === 14 ? (
                                    <small className="warning">
                                        1 character left.
                                    </small>
                                ) : 
                                    <small className="buffer">.</small>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Button className="contact-reset" type="reset" onClick={this.handleReset}>Reset Form</Button>
                                <Button className="contact-submit" type="submit" disabled={!isEnabled}>Send Message</Button>
                            </FormGroup>
                        </Form>
                    </main>
                    <Footer/>
                </div>
            </>
        );
    };
};

// email regex string
const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

const mapStateToProps = state => ({
    contact: state.contact,
    error: state.error
});

const mapDispatchToProps = { postContact, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

