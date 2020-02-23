import React, { Component } from "react";

import { connect } from "react-redux";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, Label, Input
} from "reactstrap";

import "./Bugs.scss";

class Bugs extends Component {
    state = {
        open: false
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { open } = this.state;

        clearErrors();

        this.setState({
            open: !open
        });
    };  

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { } = this.state;
        const { } = this.props;

        

        // close modal
        this.toggle();
    };

    render() {
        const { open } = this.state;

        return (
            <>
                <Modal isOpen={open}>
                    <ModalHeader toggle={this.toggle}>
                        Report a Bug
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit">Submit Bug Report</Button>
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

const mapDispatchToProps = { clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);