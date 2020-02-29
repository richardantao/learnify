import React, { Component } from "react";

import { connect } from "react-redux";
import { editProfile, updateProfile } from "../../../../actions/app/users";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import {
    Alert, Button,
    Form, FormGroup, Label, Input, 
} from "reactstrap";

class Profile extends Component {
    state = {

    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        editProfile: PropTypes.func.isRequired,
		updateProfile: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { editProfile } = this.props;

        editProfile();
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
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateProfile } = this.props;
        const { } = this.state;

        const profile = {

        };

        updateProfile(profile);


    };

    render() {
        const { message } = this.state;
        const {
            user: { profile }
        } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>   
                {  message === "Profile Updated" ? (
                    <Alert color="success">{message}</Alert>
                ): message ? (
                    <Alert color="danger">{message}</Alert>
                ): null}  
                <FormGroup>
                    <Label for="first">First Name</Label>
                    <Input
                        name="first"
                        type="text"
                        // value={}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>

                </FormGroup>
                <FormGroup>
                    <Button type="button" onClick={this.handleCancel} className="">
                        Cancel Changes
                    </Button>
                    <Button type="submit" className="">
                        Update Profile
                    </Button>
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

const mapDispatchToProps = { editProfile, updateProfile, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);