import React, { Component } from "react";

import { connect } from "react-redux";
import { updateAssessment, deleteAssessment } from "../../../actions/data/assessments";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button, Alert 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class AssessmentEdit extends Component {
    state = {
        modal: false,
        _id: "", 
        course: {},
        title: "",
        type: "",
        location: "",
        start: "",
        end: "",
        score: "",
        weight: "",
        courses: [],
        message: null
    };
    
    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        assessment: PropTypes.object.isRequired,
        updateAssessment: PropTypes.func.isRequired,
        deleteAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps, prevState) {
        const { modal } = this.state;
        const { 
            error,
            assessment: { assessments, courses }
        } = this.props; 

        if(error !== prevProps.error) {
            if(error.id === "ASSESSMENTS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(modal && !prevState.modal) {
            this.setState({
                _id: assessments._id,
                course: assessments.course,
                title: assessments.title,
                type: assessments.type,
                location: assessments.location,
                start: assessments.date.start,
                end: assessments.date.end,
                score: assessments.grade.score,
                weight: assessments.grade.weight,
                courses
            });
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

    handleCancel = () => {
        this.setState({
            _id: "", 
            course: {},
            title: "",
            type: "",
            location: "",
            start: "",
            end: "",
            score: "",
            weight: "",
            courses: [],
            message: null
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteAssessment } = this.props;
        
        deleteAssessment(id);

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateAssessment } = this.props;
        const { _id, course, title, type, location, start, end, score, weight } = this.state;

        const assessment = {
            course,
            title,
            type,
            location,
            date: {
                start, 
                end
            },
            grade: {
                score,
                weight
            }
        };

        updateAssessment(_id, assessment);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    render() {
        const { modal, _id, title, course, type, location, start, end, weight, score, courses, message } = this.state;

        const isEnabled = title && course && type & location & start;

        return (
            <>
                <Button href="#editAssessment" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
            
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Assessment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            { message === "Assessment Updated" ? <Alert color="success">{message}</Alert>
                            : message ? <Alert color="danger">{message}</Alert>
                            : null}
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
                                    onChange={this.handleChange}
                                >
                                    <option key={course._id} value={JSON.stringify(course._id)} selected="selected">
                                        {course.title}
                                    </option>
                                    {courses.map(({ _id, title }) => {
                                        return (
                                            <option key={_id} value={JSON.stringify(title)}>
                                                {title}
                                            </option>
                                        );
                                    })}    
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="type">Type</Label>
                                <Input
                                    name="type"
                                    type="select"
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value={JSON.stringify(type)}>{type}</option>
                                input option types
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
                                    <Label for="start">Start-</Label>
                                    <Input
                                        name="start"
                                        type="date"
                                        value={start}
                                        onChange={this.handleChange}
                                        required
                                    />

                                    <Label for="end">End Date</Label>
                                    <Input
                                        name="end"
                                        type="date"
                                        value={end}
                                        onChange={this.handleChange}
                                    />
                            </FormGroup>
                            <FormGroup>
                                <Label for="score">Score</Label>
                                <Input
                                    name="score"
                                    type="number"
                                    value={score}
                                    onChange={this.handleChange}
                                />

                                <Label for="weight">Weight</Label>
                                <Input
                                    name="weight"
                                    type="number"
                                    value={weight}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete.bind(_id)}>Delete Assessment</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit" disabled={!isEnabled}>Save Assessment</Button>
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