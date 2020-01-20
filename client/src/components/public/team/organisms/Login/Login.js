import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { login } from "../../../../../actions/auth/auth";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button, 
    Modal, ModalHeader, ModalBody, ModalFooter,   
    Form, FormGroup, Label, Input 
} from "reactstrap";

import Forgot from "../Forgot";

import "./Login.scss";

class Login extends Component {
    state = {
        modal: false,
        email: "",
        password: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
            if (error.id === "LOGIN_FAILED") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();

        this.setState({
            modal: !modal
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { login } = this.props;
        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        login(user);

        this.toggle();
    };  

    render() {
        const { modal, message } = this.state;

        return (
            <Fragment>
               <Button href="#signin" onClick={this.toggle}>
                    Sign In
               </Button>
                
                <Modal id="login" isOpen={modal}>
                    <ModalHeader toggle={this.toggle}>
                        <h2>Sign In</h2>
                    </ModalHeader>  
                    <Form onSubmit={this.onSubmit}>
                        <ModalBody>
                            { message ? (
                                <Alert color="danger">{message}</Alert> 
                            ):  null }
                            
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email.."
                                    className="mb-3"
                                    onChange={this.handleChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter password.."
                                    className= "mb-3"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button id="submit" type="submit" block>
                                    Sign In
                                </Button>
                                <Forgot/>
                                {/* <div className="create">
                                    <span>Don't have an account?</span>
                                    <Button id="register" href="/register">Create Team Account</Button>
                                </div> */}
                            </ModalFooter>
                        </ModalBody>
                    </Form>
                </Modal>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { login, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Login);