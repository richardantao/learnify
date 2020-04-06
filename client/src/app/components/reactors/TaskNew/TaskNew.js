import React, { Component } from "react";

import { connect } from "react-redux";
import { newTask, createTask } from "../../../actions/data/tasks";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row, Col, 
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class TaskNew extends Component {
    state = {
        isOpen: false,
        course: "",
        title: "",
        type: "",
        deadline: "",
        description: "",
        courses: [],
        message: null
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        newTask: PropTypes.func.isRequired,
        createTask: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidUpdate(prevProps, prevState) {
        const { isOpen } = this.state;
        const { 
            error,
            task: { courses },
            newTask
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TASKS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(isOpen && !prevState.isOpen) {
            newTask();

            if(courses !== prevProps.task.courses) {
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

    handleCancel = e => {
        this.setState({
            course: "",
            title: "",
            type: "",
            deadline: "",
            description: "",
            courses: [],
            message: null
        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { title, course, type, deadline, description } = this.state;
        const { createTask } = this.props;

        const task = { title, course, type, deadline, description };
      
        createTask(task);
      
        setTimeout(() => {
            this.toggle();
        }, 2000);
    };
    
    render() {
        const { isOpen, title, course, type, deadline, description, courses, message } = this.state;

        const isEnabled = title && course && type && deadline;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Task
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Task</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>    
                            { message === "Task created" ? <Alert color="success">{message}</Alert>
                            : message ? <Alert color="danger">{message}</Alert>
                            : null }
                            <FormGroup className="modal-body">
                                <Row>
                                    <Col>
                                        <Label for="title">Title</Label>
                                        <Input 
                                            name="title"
                                            type="text" 
                                            value={title}
                                            onChange={this.handleChange}
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
                            <FormGroup className="modal-body">
                                <Row>
                                    <Col>
                                        <Label for="type">Type</Label>
                                        <Input 
                                            name="type" 
                                            type="select" 
                                            value={type} 
                                            onChange={this.handleChange}
                                        >
                                        type options here
                                        </Input>
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
                            <FormGroup className="modal-body">
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
                                <Button type="submit" disabled={!isEnabled}>Create Task</Button>
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

const mapDispatchToProps = { newTask, createTask, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);