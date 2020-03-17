import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import { deleteUser } from "../../../actions/auth/auth";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button, 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, Label, Input 
} from "reactstrap";

class AppDelete extends Component {
    state = {
        modal: false,
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        deleteUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "AUTH_ERROR") {
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
        this.setState({ modal: !modal });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { _id } = this.state;
        const { deleteUser } = this.props;

        deleteUser(_id);
    };  

    render() {
        const { modal, message } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title>My Learnify | Delete Account</title>
                </Helmet>
                <Button>Delete Account</Button>
                
                <Modal isOpen={modal}>
                    <ModalHeader toggle={this.toggle}>Delete Account</ModalHeader>
                    <Form>
                        <ModalBody>
                            { message ? <Alert color="danger">{message}</Alert> : null }
                            <FormGroup>

                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" onClick={this.toggle}>
                                Cancel
                            </Button>
                            <Button type="submit" className="">
                                Delete Profile
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { deleteUser, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AppDelete);