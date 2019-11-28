import React, { Component } from "react";

import { connect } from "react-redux";
import { editAssessment, updateAssessment, deleteAssessment } from "../../../actions/data/assessments.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from "reactstrap";

import "./AssEditModal.scss";

class AssEditModal extends Component {
    state = {
        open: false
    };
    
    static propTypes = {
        isAuthenticated: PropTypes.func,
        error: PropTypes.object.isRequired,
        editAssessment: PropTypes.func.isRequired,
        updateAssessment: PropTypes.func.isRequired,
        deleteAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.setState({
            open: true
        });

        this.props.editAssessment();
    };

    componentDidUpdate() {
        const { error, isAuthenticated } = this.props; 
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
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

        const revisedAss = {

        };

        // pass updated object to action function
        this.props.updateAssessment(revisedAss);

        this.toggle();
    };

    handleCancel = () => {
        this.setState({
            
        });

        this.toggle();
    };

    handleDelete = id => {
        this.props.deleteAssessment(id);

        this.toggle();
    };

    render() {
        const { open } = this.state;

        return (
            <Modal isOpen={open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit Assessment</ModalHeader>
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
                            <Button type="button" onClick={this.handleDelete.bind(this)}>Delete Assessment</Button>
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit">Save Assessment</Button>
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

const mapDispatchToProps = { editAssessment, updateAssessment, deleteAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssEditModal);
