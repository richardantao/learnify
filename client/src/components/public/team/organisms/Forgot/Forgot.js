import React, { Component } from "react";

import { connect } from "react-redux";
import { resetPassword } from "../../../../../actions/auth/auth";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, Label, Input 
} from "reactstrap";

import "../../Application.scss";

class Forgot extends Component {
    state = {
        modal: false,
        email: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        resetPassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        this.setState({
            modal: !modal
        });

        clearErrors();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { resetPassword } = this.props;
        const { email } = this.state;

        resetPassword(email);

        
        setTimeout(this.toggle(), 3000);
    };

    render() {
        const { modal, email, message } = this.state;

        return (
            <> 
                <a id="forgot" href="#forgot" className="forgot" onClick={this.toggle}>Forgot Password?</a>

                <Modal isOpen={modal}>
                    <ModalHeader toggle={this.toggle}>Reset Password</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            { message ? (
                                <Alert>{message}</Alert>
                            ): null}
                            <Label for="email">Email</Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="e.g. johndoe@example.com"
                                value={email}
                                onChange={this.handleChange}
                                required
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit">Send Reset Token</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { resetPassword, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
