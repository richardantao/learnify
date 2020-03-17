import React, { Component } from "react";

import { connect } from "react-redux";
import  { updateClass, deleteClass } from "../../../actions/data/classes";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import {
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


class ClassEdit extends Component {
    state = {
        modal: false,
        _id: "",
        course: {},
        courses: [],
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        updateClass: PropTypes.func.isRequired,
        deleteClass: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

        
    };

    componentDidUpdate(prevProps) {
        const { 
            error,
            classes: { classes, courses }
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "CLASSES_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(classes !== prevProps.classes.classes) {
            this.setState({
                _id: classes._id,
                course: classes.course,
                title: classes.title,
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
            courses: []
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteClass } = this.props; 

        deleteClass(id);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateClass } = this.props;
        const { _id, course, title } = this.state;

        const revisedClass = {
            course,
            title
        };

        updateClass(_id, revisedClass);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };
    
    render() {
        const { modal, _id, course, title, courses, message } = this.state;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Class
                    </ModalHeader>
                    <Form>
                        <ModalBody>
                            { message === "Class updated" || message === "Class deleted" ? <Alert color="success">{message}</Alert>
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
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option key={course._id} value={JSON.stringify(course._id)} selected="selected">
                                        {course.title}
                                    </option>
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
                                <Label for=""></Label>
                                <Input
                                    name=""
                                    type=""
                                    value=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" onClick={this.handleDelete.bind(_id)} className="">
                                Delete Class
                            </Button>
                            <Button type="button" onClick={this.handleCancel} className="">
                                Cancel
                            </Button>
                            <Button type="submit" className="">
                                Update Class
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    classes: state.classes
});

const mapDispatchToProps = { updateClass, deleteClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(ClassEdit);