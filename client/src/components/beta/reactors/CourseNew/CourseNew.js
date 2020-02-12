import React, { Component } from "react";

import { connect } from "react-redux";
import { newCourse, createCourse } from "../../../../actions/beta/courses";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class CourseNew extends Component {
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
        course: PropTypes.object.isRequired,
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
            course: { terms }
        } = this.props;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Course
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
                                    {terms.map(({ _id, title }) => {
                                        <option key={_id} value={JSON.stringify(title)}>
                                            {title}
                                        </option>
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
                                <Button type="submit" className="">Create Course</Button>
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
