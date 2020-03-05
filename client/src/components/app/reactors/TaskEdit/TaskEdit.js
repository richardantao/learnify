import React, { Component } from "react";

import { connect } from "react-redux";
import { editTask, updateTask, deleteTask } from "../../../../actions/app/tasks";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from '../../atoms/Icon';

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class TaskEditModal extends Component {
    state = {
        modal: false,
        _id: "",
        course: {},
        title: "",
        type: "",
        deadline: "",
        completion: 0,
        description: "",
        courses: [],
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        editTask: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {
            tasks,
            courses
        } = this.props.task;

        this.setState({
            _id: tasks._id,
            course: tasks.course,
            title: tasks.title,
            type: tasks.type,
            deadline: tasks.deadline,
            completion: tasks.completion,
            description: tasks.description,
            courses
        });
    };

    componentDidUpdate(prevProps) {
    const { error/*, isAuthenticated*/ } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TASKS_ERROR") {
                this.setState({ message: error.message.message });  
            } else {
                this.setState({ message: null });  
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
            _id: "",
            course: {},
            title: "",
            type: "",
            deadline: "",
            completion: 0,
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
        const { _id, title, course, type, deadline, completion, note } = this.state;

        const task = { title, course, type, deadline, completion, note };

        updateTask(_id, task);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };
    
    render() {
        const { modal, _id, course, title, type, deadline, completion, description, courses, message } = this.state;

        const isEnabled = course && title && type && deadline && completion;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Task</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody> 
                            { message === "Task updated" ? (
                                <Alert color="success">{message}</Alert>
                            ): message ? (
                                <Alert color="danger">{message}</Alert>
                            ): null }
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
                                    nam="course"
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

                                <Label for="type">Type</Label>
                                <Input 
                                    name="type" 
                                    type="select" 
                                    value={type}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="deadline">Deadline</Label>
                                <Input 
                                    name="deadline" 
                                    type="date" 
                                    value={deadline} 
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="completion">Completion</Label>
                                <Input 
                                    name="completion" 
                                    type="range" 
                                    value={completion} 
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="description">Description</Label>
                                <Input 
                                    name="description" 
                                    type="textarea" 
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete.bind(_id)}>Delete</Button>
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
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    task: state.task
});

const mapDispatchToProps = { editTask, updateTask, deleteTask, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditModal);