import React, { Component } from "react";

import { connect } from "react-redux";
import { newAssessment, createAssessment } from "../../../actions/data/assessments.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from "reactstrap";

import "./AssNewModal.scss";

class AssNewModal extends Component {
    state = {
        open: false
    };
    
    static propTypes = {
        isAuthenticated: PropTypes.func,
        error: PropTypes.object.isRequired,
        newAssessment: PropTypes.func.isRequired,
        createAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.setState({
            open: true
        });

        this.props.newAssessment();
    };

    componentDidUpdate (prevProps) {
        const { error, isAuthenticated } = this.props;
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
    
    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { } = this.state;

        const newAss = {

        };

        this.props.createEvaluation(newAss);

        this.toggle();
    };  

    render() {
        const { open } = this.state;
        return (
            <Modal isOpen={open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>New Assessment</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.hanleSubmit}>
                        <FormGroup>
                            <Label for=""></Label>
                            <Input
                            type=""
                            name=""
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit">Add New Assessment</Button>
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

const mapDispatchToProps = { newAssessment, createAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssNewModal);


