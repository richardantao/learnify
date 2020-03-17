import React, { Component } from "react";

import { connect } from "react-redux";
import { newCourse, createCourse } from "../../../actions/data/courses";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button, Alert 
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class CourseNew extends Component {
    state = {
        modal: false,
        term: "",
        code: "",
        title: "",
        credit: 0,
        instructor: "",
        theme: "",
        terms: [],
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        course: PropTypes.object.isRequired,
        newCourse: PropTypes.func.isRequired,
        createCourse: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps, prevState) {
        const { modal } = this.state;
        const { 
            error,
            course: { terms },
            newCourse 
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "COURSES_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(modal && !prevState.modal) {
            newCourse();

            if(terms !== prevProps.course.terms) {
                this.setState({ terms });
            };
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
            term: "",
            code: "",
            title: "",
            credit: 0,
            instructor: "",
            theme: "",
            terms: [],
            message: null
        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createCourse } = this.props;
        const { code, term, title, credit, instructor, theme } = this.state;

        const course = {
            code, 
            term, 
            title, 
            credit, 
            instructor, 
            theme
        };

        createCourse(course);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };
    
    render() {
        const { modal, term, code, title, credit, instructor, theme, terms, message } = this.state;

        const isEnabled = term && code && title && credit && theme;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Course
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Course</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>    
                            { message === "Course created" ? (
                                <Alert color="success">{message}</Alert>
                            ): message ? (
                                <Alert color="danger">{message}</Alert>
                            ): null }
                            <FormGroup>
                                <Label for="term">Term</Label>
                                <Input
                                    name="term"
                                    type="select"
                                    onChange={this.handleChange}
                                    required
                                >
                                    {terms.map(({ _id, title }) => {
                                        return (
                                            <option key={_id} value={JSON.stringify(_id)}>
                                                {title}
                                            </option>
                                        );
                                    })}
                                </Input>

                                <Label for="code">Code</Label>
                                <Input
                                    name="code"
                                    type="text"
                                    value={code}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.handleChange}
                                    required
                                />

                            </FormGroup>
                            <FormGroup>
                                <Label for="credit">Credit</Label>
                                <Input
                                    name="credit"
                                    type="number"
                                    value={credit}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="instructor">Instructor</Label>
                                <Input
                                    name="instructor"
                                    type="text"
                                    value={instructor}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="theme">Theme</Label>
                                <Input
                                    name="theme"
                                    type="text"
                                    value={theme}
                                    onChange={this.handleChange}
                                    required
                                /> {/* Use selected options */}
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleCancel} className="">Cancel</Button>
                                <Button type="submit" className="" disabled={!isEnabled}>Create Course</Button>
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
    course: state.course
});

const mapDispatchToProps = { newCourse, createCourse, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CourseNew);