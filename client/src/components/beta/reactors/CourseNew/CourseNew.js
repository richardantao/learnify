import React, { Component } from "react";

import { connect } from "react-redux";
import { newCourse, createCourse } from "../../../../actions/beta/courses";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./CourseNewModal.scss";

class CourseNewModal extends Component {
    state = {
        modal: false,
        code: "",
        term: "",
        title: "",
        credit: null,
        instructor: "",
        theme: "",
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        newCourse: PropTypes.func.isRequired,
        createCourse: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { newCourse } = this.props;

        newCourse();
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {
            this.setState({
                message: ""
            });
        } else {

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
        const { modal, code, term, title, credit, instructor, theme, message } = this.state;
        const { 
            course: {
                terms
            }
        } = this.props;

        const termOptions = terms.map(({ _id, title }) => {
            // <option 
            //     key={_id} 
            //     value={JSON.stringify(title)}
            // >
            //     {title}
            // </option>
        });

        return (
            <>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Course
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Course</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>    
                            <FormGroup>
                                <Label for="term">Term</Label>
                                <Input
                                    name="term"
                                    type="select"
                                    value={term}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {termOptions}
                                </Input>

                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="code">Code</Label>
                                <Input
                                    name="code"
                                    type="text"
                                    value={code}
                                    onChange={this.handleChange}
                                    required
                                />

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
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Create Course</Button>
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

const mapDispatchToProps = { newCourse, createCourse, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CourseNewModal);
