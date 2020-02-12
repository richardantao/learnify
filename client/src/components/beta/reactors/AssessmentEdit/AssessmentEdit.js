import React, { Component } from "react";

import { connect } from "react-redux";
import { updateAssessment, deleteAssessment } from "../../../../actions/beta/assessments";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class AssessmentEdit extends Component {
    state = {
        modal: false
    };
    
    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        updateAssessment: PropTypes.func.isRequired,
        deleteAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props; 

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: "" });
            };
        } else {
            this.setState({ message: null });
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

        const { updateAssessment } = this.props;
        const { } = this.state;

        const assessment = {
            
        };

        // pass updated object to action function
        updateAssessment(assessment);

        setTimeout(() => {
            this.toggle();
        }, 2000);
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
        const { modal, title, course, type, start, end, location, weight, score } = this.state;
        const { 
            assessment: { 
                assessments,
                courses 
            }
        } = this.props;

        return (
            <>
                <Button href="#editAssessment" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
            
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Assessment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.handleChange}
                                />

                                <Label for="course"></Label>
                                <Input
                                    name="course"
                                    type="select"
                                    value={course}
                                    onChange={this.handleChange}
                                >
                                    {courses.map(({ _id, title }) => {
                                        <option key={_id} value={JSON.stringify(title)}>
                                            {title}
                                        </option>
                                    })}    
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete.bind(assessments._id)}>Delete Assessment</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Save Assessment</Button>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    assessment: state.assessment
});

const mapDispatchToProps = { updateAssessment, deleteAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentEdit);