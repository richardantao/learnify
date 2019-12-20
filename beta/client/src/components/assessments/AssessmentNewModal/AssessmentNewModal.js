import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { newAssessment, createAssessment } from "../../../actions/data/assessments.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, 
    Form, FormGroup, Label, Input, Button, ModalFooter 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./AssessmentNewModal.scss";

class AssessmentNewModal extends Component {
    state = {
        modal: false
    };
    
    static propTypes = {
        // isAuthenticated: PropTypes.func,
        error: PropTypes.object.isRequired,
        newAssessment: PropTypes.func.isRequired,
        createAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { newAssessment } = this.props;


        newAssessment();
    };

    componentDidUpdate (prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {

        };
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
    
    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createAssessment } = this.props;
        const { } = this.state;

        const assessment = {

        };

        createAssessment(assessment);

        this.toggle();
    };  

    render() {
        const { modal } = this.state;

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Assessment
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Assessment</ModalHeader>
                    <Form onSubmit={this.hanleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for=""></Label>
                                <Input
                                    type=""
                                    name=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Add New Assessment</Button>
                            </ModalFooter>
                        </ModalBody>
                    </Form>
                </Modal>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { newAssessment, createAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentNewModal);


