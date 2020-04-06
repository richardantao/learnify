import React, { Component } from "react";

import { connect } from "react-redux";
import { newAssessment, createAssessment } from "../../../actions/data/assessments";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row, Col,
    Form, FormGroup, Label, Input, 
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class AssessmentNew extends Component {
    state = {
        isOpen: false,
        _id: "",
        course: "",
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
        // isAuthenticated: PropTypes.func,
        error: PropTypes.object.isRequired,
        assessment: PropTypes.object.isRequired,
        newAssessment: PropTypes.func.isRequired,
        createAssessment: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate (prevProps, prevState) {
        const { isOpen } = this.state;
        const { 
            error,
            assessment: { courses },
            newAssessment
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "ASSESSMENTS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(isOpen && !prevState.isOpen) {
            newAssessment();

            if(courses !== prevProps.assessment.courses) {
                this.setState({ courses });
            };
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
            course: "",
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

    handleSubmit = e => {
        e.preventDefault();

        const { createAssessment } = this.props;
        const { course, title, type, location, start, end, score, weight } = this.state;

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

        createAssessment(assessment);
    };  

    render() {
        const { isOpen, title, course, type, location, start, end, score, weight, courses, message } = this.state;

        const isEnabled = title && course && type & location & start;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Assessment
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Assessment</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            { message ? <Alert color="danger">{message}</Alert> : null }
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="title">Title</Label>
                                        <Input
                                            name="title"
                                            type="text"
                                            value={title}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="course">Course</Label>
                                        <Input 
                                            name="course"
                                            type="select"
                                            value={course}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            {courses.map(({ _id, title }) => {
                                                return (
                                                    <option key={_id} value={JSON.stringify(_id)}>
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
                                            value={type}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            {/* populate options here */}
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
                                <Row>
                                    <Col>
                                        <Label for="weight">Weight</Label>
                                        <Input
                                            name="weight"
                                            type="number"
                                            value={weight}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="score">Score/Grade/Mark</Label>
                                        <Input
                                            name="score"
                                            type="number"
                                            value={score}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit" disabled={!isEnabled}>Create Assessment</Button>
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
    error: state.error,
    assessment: state.assessment
});

const mapDispatchToProps = { newAssessment, createAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentNew);