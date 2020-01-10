import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { editAssessment, updateAssessment, deleteAssessment } from "../../../../actions/beta/assessments";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./AssessmentEditModal.scss";

class AssessmentEditModal extends Component {
    state = {
        modal: false
    };
    
    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editAssessment: PropTypes.func.isRequired,
        updateAssessment: PropTypes.func.isRequired,
        deleteAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { editAssessment } = this.props;
        
        editAssessment();
    };

    componentDidUpdate(prevProps) {
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

    handleSubmit = e => {
        e.preventDefault();

        const { updateAssessment } = this.props;
        const { } = this.state;

        const assessment = {
            
        };

        // pass updated object to action function
        updateAssessment(assessment);

        this.toggle();
    };

    handleCancel = () => {
        this.setState({
            
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteAssessment } = this.props;
        
        deleteAssessment(id);

        this.toggle();
    };

    render() {
        const { modal } = this.state;

        return (
            <Fragment>
                <Button href="#editAssessment" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
            
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Assessment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for=""></Label>
                                <Input
                                    name=""
                                    type=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete.bind(this)}>Delete Assessment</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Save Assessment</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editAssessment, updateAssessment, deleteAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentEditModal);
