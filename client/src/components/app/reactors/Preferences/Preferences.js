import React, { Component } from "react";

import { connect } from "react-redux";
import { editPreferences, updatePreferences } from "../../../../actions/app/users";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import {
    Alert, Button,
    Form, FormGroup, Label, Input
} from "reactstrap";

class Preferences extends Component {
    state = {
        startDay: "",
        startTime: "",
        defaultDuration: 0,
        defaultCalendar: "Month",
        onEmailList: true,
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        editPreferences: PropTypes.func.isRequired,
        updatePreferences: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { 
            startDay,
            startTime,
            defaultDuration,
            defaultCalendar,
            onEmailList
        } = this.props.user.preferences; 

        this.setState({
            startDay,
            startTime,
            defaultDuration,
            defaultCalendar,
            onEmailList
        });
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "SETTINGS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = () => {
        this.setState({ 
            startDay: "",
            startTime: "",
            defaultDuration: 0,
            defaultCalendar: "Month",
            onEmailList: true,
            message: null
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updatePreferences } = this.props;
        const { 
            startDay,
            startTime,
            defaultDuration,
            defaultCalendar,
            onEmailList
        } = this.state;

        const preferences = { 
            startDay,
            startTime,
            defaultDuration,
            defaultCalendar,
            onEmailList
        };

        updatePreferences(preferences);
    };  

    render() {
        const { startDay, startTime, defaultDuration, defaultCalendar, onEmailList, message } = this.state;

        const isEnabled = startDay && startTime && defaultDuration && defaultCalendar;

        return (
            <Form onSubmit={this.handleSubmit}>
                { message === "Preferences updated" ? <Alert color="success">{message}</Alert>
                : message ? <Alert color="danger">{message}</Alert>
                : null }
                <FormGroup>
                    <Label for="startDay">Start Day</Label>
                    <Input
                        name="startDay"
                        type="text"
                        value={startDay}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="startTime">Start Time</Label>
                    <Input
                        name="startTime"
                        type="date"
                        value={startTime}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="defaultDuration">Default Duration</Label>
                    <Input
                        name="defaultDuration" 
                        type="number"
                        value={defaultDuration}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="defaultCalendar">Default Calendar</Label>
                    <Input
                        name="defaultCalendar"
                        type="select"
                        value={defaultCalendar}
                        onChange={this.handleChange}
                        required
                    >
                        
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="onEmailList">Email List</Label>
                    <Input
                        name="onEmailList"
                        type="checkbox"
                        value={onEmailList}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="button" onClick={this.handleCancel} lassName="">Cancel Changes</Button>
                    <Button type="submit" className="" disabled={!isEnabled}>Update Preferences</Button>
                </FormGroup>
            </Form>
        );
    };
};  

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.user
});

const mapDispatchToProps = { editPreferences, updatePreferences, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);