import React, { Component } from "react";

import { connect } from "react-redux";
import { newTask, createTask } from "../../../../actions/app/tasks";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class TaskNew extends Component {
    state = {
        modal: false,
        course: "",
        title: "",
        type: "",
        deadline: "",
        completion: 0,
        description: "",
        courses: [],
        message: null
    }

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        newTask: PropTypes.func.isRequired,
        createTask: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        const { newTask } = this.props;
        newTask();

        const { courses } = this.props.task;
        this.setState({ courses });
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "PROCESSING_TASKS_FAILED") {
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

    handleCancel = e => {
        this.setState({
            course: "",
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

    handleSubmit = e => {
        e.preventDefault();

        const { title, course, type, deadline, completion, description } = this.state;
        const { createTask } = this.props;

        const task = { title, course, type, deadline, completion, description };
      
        createTask(task);
      
        setTimeout(() => {
            this.toggle();
        }, 2000);
    };
    
    render() {
        const { modal, title, course, type, deadline, completion, description, courses, message } = this.state;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Task
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Task</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>    
                            { message === "Task created" ? <Alert color="success">{message}</Alert>
                            : message ? <Alert color="danger">{message}</Alert>
                            : null }
                            <FormGroup className="modal-body">
                                <Label for="title">Title</Label>
                                <Input 
                                    name="title"
                                    type="text" 
                                    value={title}
                                    onChange={this.handleChange}
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
                            <FormGroup className="modal-body">
                                <Label for="type">Type</Label>
                                <Input 
                                    name="type" 
                                    type="select" 
                                    value={type} 
                                    onChange={this.handleChange}
                                >
                                    type options here
                                </Input>

                                <Label for="deadline">Deadline</Label>
                                <Input 
                                    name="deadline"
                                    type="date"
                                    value={deadline}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="modal-body">
                                <Label>Completion</Label>
                                <Input
                                    name="completion"
                                    type="range"
                                    value={completion}
                                    onChange={this.handleChange}
                                />

                                <Label>Description</Label>
                                <Input
                                    name="description"
                                    type="textarea"
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter className="modal-action">
                                <Button type="button" onCancel={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Create Task</Button>
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

const mapDispatchToProps = { newTask, createTask, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);