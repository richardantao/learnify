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
        first: "",
        last: "",
        email: "",
        country: "",
        region: "",
        institution: "",
        school: "",
        message: null
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
        const {  
            first, 
            last, 
            email, 
            country, 
            region, 
            institution, 
            school 
        } = this.props.user.profile;

        this.setState({
            first,
            last, 
            email,
            country, 
            region,
            institution,
            school
        });
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "PROCESSING_PROFILE_FAILED") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateProfile } = this.props;
        const { first, last, email, country, region, institution, school } = this.state;

        const profile = {
            first, 
            last, 
            email, 
            country, 
            region, 
            institution, 
            school
        };

        updateProfile(profile);
    };

    handleCancel = () => {  
        const {  
            first, 
            last, 
            email, 
            country, 
            region, 
            institution, 
            school 
        } = this.props.user.profile;

        this.setState({
            first,
            last, 
            email,
            country, 
            region,
            institution,
            school
        });
    };

    render() {
        const { first, last, email, country, region, institution, school, message } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>   
                {  message === "Profile updated" ? (
                    <Alert color="success">{message}</Alert>
                ): message ? (
                    <Alert color="danger">{message}</Alert>
                ): null}  
                <FormGroup>
                    <Label for="first">First Name</Label>
                    <Input
                        name="first"
                        type="text"
                        value={first}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="last">Last Name</Label>
                    <Input
                        name="last"
                        type="text" 
                        value={last}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="country">Country</Label>
                    <Input
                        name="country"
                        type="select"
                        onChange={this.handleChange}
                    >
                        fill with countries
                    </Input>

                    <Label for="region">Province/State</Label>
                    <Input
                        name="region"
                        type="select"
                        onChange={this.handleChange}
                    >
                        
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="institution">Institution Level</Label>
                    <Input
                        name="institution"
                        type="select"
                        onChange={this.handleChange}
                    />

                    <Label for="school">School</Label>
                    <Input
                        name="school"
                        type="select"
                        onChange={this.handleChange}
                    >

                    </Input>
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