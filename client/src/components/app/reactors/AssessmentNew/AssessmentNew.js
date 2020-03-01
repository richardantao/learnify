import React, { Component } from "react";

import { connect } from "react-redux";
import { newAssessment, createAssessment } from "../../../../actions/app/assessments";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, 
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class AssessmentNew extends Component {
    state = {
        modal: false,
        _id: "",
        course: "",
        title: "",
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

    componentDidMount() {
        const { newAssessment } = this.props;
        newAssessment();

        const { courses } = this.props.assessment;
        this.setState({ courses });
    };

    componentDidUpdate (prevProps) {
        const { error/*, isAuthenticated*/ } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "ASSESSMENTS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        this.setState({ modal: !modal });

        clearErrors();
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    handleCancel = () => {
        this.setState({
            _id: "",
            course: "",
            title: "",
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

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };  

    render() {
        const { modal, title, course, type, location, start, end, score, weight, courses, message } = this.state;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Assessment
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Assessment</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            { message === "Assessment created" ? <Alert color="success">{message}</Alert>
                            : message ? <Alert color="danger">{message}</Alert>
                            : null }
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
                                >
                                    {courses.map(({ _id, title }) => {
                                        return (
                                            <option key={_id} value={JSON.stringify(_id)}>
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
                                <Label for="weight">Weight</Label>
                                <Input
                                    name="weight"
                                    type="number"
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
    error: state.error,
    assessment: state.assessment
});

const mapDispatchToProps = { newAssessment, createAssessment, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentNew);