import React, { Component } from "react";

import { connect } from "react-redux";
import { register } from "../../../../../actions/auth/auth";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";

import "./TeamRegister";

class TeamRegister extends Component {
    state = {
        first: "",
        last: "",
        email: "",
        password: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = e => {
        e.preventDefault();

        const { register } = this.props;
        const { first, last, email, password } = this.state;

        const user = {
            name: {
                first,
                last
            },
            email,
            password
        };

        register(user);
    };
    
    render() {
        const { first, last, email, password, message } = this.state;

        const isEnabled = first.length > 1 && last.length > 1 && regex.test(email) && password.length > 7

        return (
            <div id="public">
                <Form onSubmit={this.handleSubmit}>
                    { message ? (
                        <Alert color="danger">{message}</Alert>
                    ): null}
                    <FormGroup>
                        <Label for="first">First Name</Label>
                        <Input
                            name="first"
                            type="text"
                            minLength={2}
                            placeholder="First Name.."
                            onChange={this.handleChange}
                            required
                        />
                        
                        <Label for="last">Last Name</Label>
                        <Input
                            name="last"
                            type="text"
                            minLength={2}
                            placeholder="Last Name.."
                            onChange={this.handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Password.."
                            onChange={this.handleChange}
                            required
                        />
                        { email.length > 0 && !regex.test(email) ? (
                            <small className="warning">Email must be a valid email address</small>
                        ): null}

                        <Label>Password</Label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password.."
                            minLength={8}
                            maxLength={128}
                            onChange={this.handleChange}
                            required
                        />
                        { password.length > 0 && password.length < 8 ? (
                            <small className="warning">Password must be at least 8 characters</small>
                        ): null}
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" disabled={!isEnabled}>Register Account</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    };
};

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { register, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TeamRegister);