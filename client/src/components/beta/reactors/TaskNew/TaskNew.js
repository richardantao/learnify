import React, { Component } from "react";

import { connect } from "react-redux";
import { newTask, createTask } from "../../../../actions/beta/tasks";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./TaskNewModal.scss";

class TaskNewModal extends Component {
    state = {
        modal: false,
        title: "",
        course: "",
        type: "",
        deadline: "",
        completion: "",
        description: ""
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        // isAuthenticated: PropTypes.bool,
        newTask: PropTypes.func.isRequired,
        createTask: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    
    componentDidMount() {
        const { newTask } = this.props;

        // Get courses for selection upon rendering of modal
        newTask();
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

    handleCancel = e => {
        this.setState({
            title: "",
            course: "",
            type: "",
            deadline: "",
            completion: "",
            description: ""
        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { title, course, type, deadline, completion, description } = this.state;
        const { createTask } = this.props;

        const task = { title, course, type, deadline, completion, description };
      
        // Add item via createTask action
        createTask(task);
      
        // Close modal
        this.toggle();
    };
    
    render() {
        const { modal, title, course, type, deadline, completion, description } = this.state;
        const { 
            task: { courses }
        } = this.props;

        const courseOptions = courses.map(course => {

        });

        return (
            <>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Task
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Task</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>    
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
                                    {courseOptions}
                                </Input>
                            </FormGroup>
                            <FormGroup className="modal-body">
                                <Label for="type">Type</Label>
                                <Input name="type" type="select" value={type} onChange={this.handleChange}>
                                    {/* type options here */}
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskNewModal);