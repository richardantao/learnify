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
        text: ""
    };

    static propTypes = {
        contact: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postContact: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if(error !== prevProps.error) {
            if(error.id === "CONTACT_ERROR") {
                this.setState({
                    message: error.message.message
                });  
            } else {
                this.setState({
                    message: null
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

        this.setState({
            name: "",
            email: "",
            text: "",
            message: null
        });

        this.props.clearErrors();
    };

    handleSubmit = e => {
        e.preventDefault();

        // grab fields from state
        const { name, email, text } = this.state;

        const contact = {
            name,
            email,
            text
        };

        // pass data to API
        this.props.postContact(contact);

        // reset form fields
        this.setState({
            name: "",
            email: "",
            text: ""
        });
    };
    
    render() {
        const { name, email, text, message } = this.state;
        const isEnabled = name.length > 2 && email.length > 5 && text.length > 14 && regex.test(email);

        const textLeft = 15 - text.length;

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
                <main className="contact-main" role="main">
                    <img src="assets/images/contact-min.jpg" className="contact-background" alt=""/>
                    <div className="contact-pitch">
                        <h3>Have a question? Send us a message.</h3>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="contact-form">
                        { message ? (
                            <Alert color="danger">{message}</Alert>
                        ) : message === "Your message has been sent. You can expect a reply shortly" ? (
                            <Alert color="success">{message}</Alert>  
                        ) : null }
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
                            ) : null}
                        </FormGroup>
                        <FormGroup>
                            <Button className="form-reset" type="reset" onClick={this.handleReset}>Reset Form</Button>
                            <Button className="form-submit" type="submit" disabled={!isEnabled}>Send Message</Button>
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

// email regex string
const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
