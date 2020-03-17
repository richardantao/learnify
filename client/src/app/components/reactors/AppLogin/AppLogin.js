import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { login } from "../../../actions/auth/auth";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Button, Container } from "reactstrap";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from "reactstrap";

class AppLogin extends Component {
    state = {
        email: "",
        password: "",
        message: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { clearErrors } = this.props;
        clearErrors();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === "LOGIN_FAILED") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({  [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        const { login } = this.props;

        const user = {
            email: {
                address: email
            },
            password
        };

        login(user);
    };

    render() {
        const { email, password, message } = this.state;

        return(
            <>
                <Helmet>
                    <title>My Learnify | Sign In</title>
                </Helmet>
                 <Container>
                     <div id="login">
                        { message === "" ? <Alert color="success">{message}</Alert>
                        : message ? <Alert color="danger">{message}</Alert> 
                        : null }
                         <Form onSubmit={this.handleSubmit}>
                             <FormGroup>
                                 <Label for="email">Email</Label>
                                 <Input
                                     type="email"
                                     name="email"
                                     id="email"
                                     value={email}
                                     placeholder="Enter email"
                                     className="mb-3"
                                     onChange={this.onChange}
                                 />
 
                                 <Label for="password">Password</Label>
                                 <Input
                                     type="password"
                                     name="password"
                                     id="password"
                                     value={password}
                                     placeholder="Enter password"
                                     className= "mb-3"
                                     onChange={this.onChange}
                                 />
                                 <Button onSubmit={this.onSubmit} color="primary" style={{ marginTop: "2rem" }} block>
                                     Sign in
                                 </Button>
                             </FormGroup>
                             <FormGroup>
                                 <a href="/beta/forgot-password" className="forgot">Forgot password?</a>
                             </FormGroup>
                         </Form>
                         <div className="create">
                             <span>Don"t have an account?</span>
                             <Button href="/beta/register">Create</Button>
                         </div>
                     </div>
                 </Container>
             </>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { login, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);