import React, { Component } from "react";

import { connect } from "react-redux";
import { editPreferences, updatePreferences } from "../../../../actions/beta/users";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import {
    Alert, Button,
    Form, FormGroup, Label, Input
} from "reactstrap";

class Preferences extends Component {
    state = {

    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        editPreferences: PropTypes.func.isRequired,
        updatePreferences: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { editPreferences } = this.props;

        editPreferences();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: "" });
            };
        } else {
            this.setState({ message: null });
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updatePreferences } = this.props;
        const { } = this.state;

        const preferences = { 

        };

        updatePreferences(preferences);
    };  

    handleCancel = () => {
        this.setState({ 
            message: null
        });
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                {  message === "Preferences updated" ? (
                    <Alert color="success">{message}</Alert>
                ): message ? (
                    <Alert color="danger">{message}</Alert>
                ): null}
                <FormGroup>
                    <Label for=""></Label>
                    <Input
                        name=""
                        type=""
                        value={}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>

                </FormGroup>
                <FormGroup>
                    <Button type="button" onClick={this.handleCancel} lassName="">Cancel Changes</Button>
                    <Button type="submit" className="">Update Preferences</Button>
                </FormGroup>
            </Form>
        );
    };
};  

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editPreferences, updatePreferences, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);