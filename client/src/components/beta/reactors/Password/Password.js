import React, { Component } from "react";

import { connect } from "react-redux";
import { editPassword, updatePassword } from "../../../../actions/beta/users";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Form, FormGroup, Label, Input
} from "reactstrap";

class Password extends Component {
    state = {

    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        editPassword: PropTypes.func.isRequired,
        updatePassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { editPassword } = this.props;

        editPassword();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {    
                this.setState({ message: ""});
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

        const { updatePassword } = this.props;
        const { } = this.state;

        const password = {
            current,
            change,
            confirm
        };

        updatePassword(password);
    };

    handleCancel = () => {

        this.setState({

        });
    };

    render() {
        const { message } = this.state;

        return (
            <Form>
                {  message === "Password Updated" ? (
                    <Alert color="success">{message}</Alert>
                ): message ? (
                    <Alert color="danger">{message}</Alert>
                ): null}
                <FormGroup>
                    <Label for="current">Current Password</Label>
                    <Input
                        name="current"
                        type="password"
                        value={}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="change">New Password</Label>
                    <Input
                        name="change"
                        type="password"
                        value={}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="confirm">Confirm Password</Label>
                    <Input
                        name="confirm"
                        type="password"
                        value={}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button>
                        Cancel Changes
                    </Button>
                    <Button type="submit" className="">
                        Update Password
                    </Button>
                </FormGroup>
            </Form>
        );
    };
};

const mapDispatchToProps = { editPassword, updatePassword, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Password);