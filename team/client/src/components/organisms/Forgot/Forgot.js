import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { resetPassword } from "../../../actions/auth/auth";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, Label, Input 
} from "reactstrap";

import "./Forgot.scss";

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

        this.toggle();
    };

    render() {
        const { modal, message } = this.state;

        return (
            <Fragment> 
                <Button href="#forgot" className="forgot" onClick={this.toggle}>Forgot Password</Button>

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
                                type="text"
                                placeholder="Email.."
                                value=""
                                onChange={this.handleChange}
                                required
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit">Submit</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { resetPassword, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
