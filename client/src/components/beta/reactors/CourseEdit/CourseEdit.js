import React, { Component } from "react";

import { connect } from "react-redux";
import { updateCourse, deleteCourse } from "../../../../actions/beta/courses";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import Icon from "../../atoms/Icon";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


class CourseEdit extends Component {
    state = {
        modal: false,
        _id: "", 
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
        updateCourse: PropTypes.func.isRequired,
        deleteCourse: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {
            this.setState({
                message: error.message.message
            });
        } else {
            this.setState({
                message: null
            });
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();

        this.setState({
            modal: !modal
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateCourse } = this.props;
        const { code, term, title, credit, instructor, theme } = this.state;
        
        const course = {
            code, 
            term, 
            title, 
            credit, 
            instructor, 
            theme
        };

        updateCourse(course);

        setTimeout(() => {
            this.toggle();            
        }, 2000);
    };

    handleCancel = () => {
        this.setState({
            code: "",
            term: "",
            title: "",
            credit: null,
            instructor: "",
            theme: "",
            message: null
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteCourse } = this.props;

        deleteCourse(id);

        this.toggle();
    };

    render() {
        const { modal, _id, code, term, title, credit, instructor, theme, message } = this.state;
        const { 
            course: { 
                courses,
                terms 
            } 
        } = this.props;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Course</ModalHeader>
                    <Form onSubmit={this.handleSubmit} className="">
                        <ModalBody>  
                            {  message === "Course Updated" || message === "Course Deleted" ? (
                                <Alert color="success">{message}</Alert>
                            ): message ? (
                                <Alert color="danger">{message}</Alert>
                            ): null}
                            <FormGroup>
                                <Label for="code">Code</Label>
                                <Input
                                    name="code"
                                    type="text"
                                    value={code}
                                    onChange={this.handleChange}
                                    required
                                />

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
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="theme">Theme</Label>
                                <Input
                                    name="theme"
                                    type=""
                                    value={theme}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete.bind(_id)}>Delete Course</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Update Course</Button>
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

const mapDispatchToProps = { updateCourse, deleteCourse, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);

