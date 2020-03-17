import React, { Component } from "react";

import { connect } from "react-redux";
import { updatePassword } from "../../../actions/data/users";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Form, FormGroup, Label, Input
} from "reactstrap";

class Password extends Component {
    state = {
        current: "",
        change: "",
        confirm: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        updatePassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
    
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
            current: "",
            change: "",
            confirm: "",
            message: null
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updatePassword } = this.props;
        const { current, change, confirm } = this.state;

        const password = {
            current,
            change,
            confirm
        };

        updatePassword(password);
    };

    render() {
        const { current, change, confirm, message } = this.state;

        const isEnabled = change === confirm;

        return (
            <Form>
                {  message === "Password updated" ? <Alert color="success">{message}</Alert>
                : message ? <Alert color="danger">{message}</Alert>
                : null }
                <FormGroup>
                    <Label for="current">Current Password</Label>
                    <Input
                        name="current"
                        type="password"
                        value={current}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="change">New Password</Label>
                    <Input
                        name="change"
                        type="password"
                        value={change}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="confirm">Confirm Password</Label>
                    <Input
                        name="confirm"
                        type="password"
                        value={confirm}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button>
                        Cancel Changes
                    </Button>
                    <Button type="submit" className="" disabled={!isEnabled}>
                        Update Password
                    </Button>
                </FormGroup>
            </Form>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error,
    user: state.user
});

const mapDispatchToProps = { updatePassword, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Password);