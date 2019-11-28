import React, { Component } from "react";

import { connect } from "react-redux";
import { editIntegration, updateIntegration, deleteIntegration } from "../../../actions/data/settings.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

import "./IntegrationEditModal.scss";

class IntegrationEditModal extends Component {
    state = {
        open: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editIntegration: PropTypes.func.isRequired,
        updateIntegration: PropTypes.func.isRequired,
        deleteIntegration: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        this.props.editIntegration();
    };

    componentDidUpdate(prevProps) {

    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });

        this.props.clearErrors();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        // pull data from state
        const { } = this.state;

        // create instance of updated data
        const revisedIntegration = {

        };

        // send updated data to /actions function
        this.props.updateIntegration(revisedIntegration);
    };

    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleDelete = id => {

        // pass id of integration to delete to the called action function
        this.props.deleteIntegration(id);

        this.toggle();
    }
    
    render() {
        const { open } = this.state;
        const { integration } = this.props;

        return (
            <Modal isOpen={open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit Integration</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for=""></Label>
                            <Input
                            type=""
                            name=""
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button type="button" onClick={this.handleDelete.bind(this)}>Delete</Button>
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editIntegration, updateIntegration, deleteIntegration, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationEditModal);