import React, { Component } from "react";

import { connect } from "react-redux";
import { editTask, updateTask, deleteTask } from "../../../actions/data/tasks";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from '../../atoms/Icon';

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Row, Col,
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class TaskEdit extends Component {
    state = {
        isOpen: false,
        _id: "",
        course: {},
        title: "",
        type: "",
        deadline: "",
        completed: 0,
        description: "",
        courses: [],
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        editTask: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidUpdate(prevProps, prevState) {
        const{ isOpen } = this.state;
        const { 
            error,
            task: { tasks, courses }
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TASKS_ERROR") {
                this.setState({ message: error.message.message });  
            } else {
                this.setState({ message: null });  
            };
        };

        if(isOpen && !prevState.isOpen) {
            this.setState({
                _id: tasks._id,
                course: tasks.course,
                title: tasks.title,
                type: tasks.type,
                deadline: tasks.deadline,
                completed: tasks.completed,
                description: tasks.description,
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
            deadline: "",
            completed: 0,
            description: "",
            courses: [],
            message: null
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteTask } = this.props; 
        deleteTask(id);

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateTask } = this.props;
        const { _id, title, course, type, deadline, completed, note } = this.state;

        const task = { title, course, type, deadline, completed, note };

        updateTask(_id, task);
    };
    
    render() {
        const { isOpen, _id, course, title, type, deadline, completed, description, courses, message } = this.state;

        const isEnabled = course && title && type && deadline && completed;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Task</ModalHeader>
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
                                            <option key={course._id} value={JSON.stringify(course.title)} selected="selected">
                                                {course.title}
                                            </option>
                                            {courses.map(({ _id, course }) => (
                                                <option key={_id} value={JSON.stringify(course)}>
                                                    {course}
                                                </option>
                                            ))}
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
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="deadline">Deadline</Label>
                                        <Input 
                                            name="deadline" 
                                            type="date" 
                                            value={deadline} 
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </Row> 
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="completed">Completed</Label>
                                        <Input 
                                            name="completed" 
                                            type="checkbox" 
                                            value={completed} 
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="description">Description</Label>
                                        <Input 
                                            name="description" 
                                            type="textarea" 
                                            value={description}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete(_id)}>Delete</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit" disabled={!isEnabled}>Update</Button>
                            </ModalFooter>    
                        </ModalBody>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error,
    task: state.task
});

const mapDispatchToProps = { editTask, updateTask, deleteTask, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);