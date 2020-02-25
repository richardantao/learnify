import React, { Component } from "react";

import { connect } from "react-redux";
import { newAssessment, createAssessment } from "../../../../actions/beta/assessments";
import { clearErrors } from "../../../../actions/auth/errors";
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
        const { modal, title, course, type, location, start, end, weight, score } = this.state;

        return (
            <>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Assessment
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Assessment</ModalHeader>
                    <Form onSubmit={this.hanleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="course">Course</Label>
                                <Input 
                                    name="course"
                                    type="select"
                                    value={course}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="type">Type</Label>
                                <Input
                                    name="type"
                                    type="select"
                                    value={type}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {/* populate options here */}
                                </Input>

                                <Label for="location">Location</Label>
                                <Input
                                    name="location"
                                    type="text"
                                    value={location}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label></Label>
                                <Input
                                    name="start"
                                    type="date"
                                    value={start}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="weight">Weight</Label>
                                <Input
                                    name="weight"
                                    type=""
                                    value={weight}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="score">Score/Grade/Mark</Label>
                                <Input
                                    name="score"
                                    type="number"
                                    value={score}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Create Assessment</Button>
                            </ModalFooter>
                        </ModalBody>
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

const mapDispatchToProps = { newAssessment, createAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentNewModal);


