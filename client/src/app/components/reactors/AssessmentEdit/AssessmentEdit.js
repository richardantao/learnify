import React, { Component } from "react";

import { connect } from "react-redux";
import { updateAssessment, deleteAssessment } from "../../../actions/data/assessments";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Row, Col,
    Form, FormGroup, Alert, Label, Input, Button, 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class AssessmentEdit extends Component {
    state = {
        isOpen: false,
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
        completed: false,
        message: null
    };
    
    static propTypes = {
        error: PropTypes.object.isRequired,
        assessment: PropTypes.object.isRequired,
        updateAssessment: PropTypes.func.isRequired,
        deleteAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps, prevState) {
        const { isOpen } = this.state;
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

        if(isOpen && !prevState.isOpen) {
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
                completed: assessments.completed,
                courses
            });
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { isOpen } = this.state;

        clearErrors();
        this.setState({ isOpen: !isOpen });
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
            completed: false,
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
        const { _id, course, title, type, location, start, end, score, weight, completed } = this.state;

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
            },
            completed
        };

        updateAssessment(_id, assessment);
    };

    render() {
        const { isOpen, _id, title, course, type, location, start, end, weight, score, completed, courses, message } = this.state;

        const isEnabled = title && course && type & location & start;

        return (
            <>
                <Button href="#editAssessment" onClick={this.toggle}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
            
                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Assessment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            { message ? <Alert color="danger">{message}</Alert> : null}
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="title">Title</Label>
                                        <Input
                                            name="title"
                                            type="text"
                                            value={title}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col>
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
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
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
                                    </Col>
                                    <Col>
                                        <Label for="location">Location</Label>
                                        <Input
                                            name="location"
                                            type="text"
                                            value={location}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="start">Start-</Label>
                                        <Input
                                            name="start"
                                            type="date"
                                            value={start}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="end">End Date</Label>
                                        <Input
                                            name="end"
                                            type="date"
                                            value={end}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Row>    
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
                            <FormGroup>
                                <Label for="completed">Completed</Label>
                                <Input
                                    name="completed"
                                    type="checkbox"
                                    checked={completed}
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
    error: state.error,
    assessment: state.assessment
});

const mapDispatchToProps = { updateAssessment, deleteAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentEdit);