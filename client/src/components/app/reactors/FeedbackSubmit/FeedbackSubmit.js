import React, { Component } from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

import { connect } from "react-redux";
import { submitFeedback } from "../../../../actions/app/feedback";
import { clearErrors } from "../../../../actions/auth/errors";

import PropTypes from "prop-types";

class FeedbackSubmit extends Component {
    state = {
        subject: "",
        description: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        feedback: PropTypes.object.isRequired,
        submitFeedback: PropTypes.func.isRequired,
        clearErrors: PropTypes.object.isRequired
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = () => { 
        this.setState({
            subject: "",
            description: "",
            message: null
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { subject, description } = this.state;
        const { submitFeedback } = this.props;

        const feedback = { subject, description };

        submitFeedback(feedback); 
    };

    render() {
        const { subject, description, message } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                { message === "Thank you for your feedback!" ? <Alert color="success">{message}</Alert>
                : message ? <Alert color="danger">{message}</Alert> 
                : null } 
                <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input
                        name="subject"
                        type="text"
                        placeholder="Subject.."
                        value={subject}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="description">Message</Label>
                    <Input
                        name="description"
                        type="text"
                        placeholder="Message.."
                        value={description}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">
                        Submit Feedback
                    </Button>
                </FormGroup>
            </Form>
        );
    };  
};

const mapStateToProps = state => ({
    error: state.error,
    feedback: state.feedback
});

const mapDispatchToProps = { submitFeedback, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackSubmit);