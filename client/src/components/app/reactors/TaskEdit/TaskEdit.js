import React, { Component } from "react";

import { connect } from "react-redux";
import { editTask, updateTask, deleteTask } from "../../../../actions/beta/tasks";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from '../../atoms/Icon';

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class TaskEditModal extends Component {
    state = {
        modal: false,
        title: "",
        course: "",
        type: "",
        deadline: "",
        completion: 0,
        note: ""
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
        const { editTask } = this.props;

        this.props.editTask();
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {

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

    handleSubmit = e => {
        e.preventDefault();

        const { updateTask } = this.props;
        const { title, course, type, deadline, completion, note } = this.state;

        const task = { title, course, type, deadline, completion, note };

        updateTask(task);

        // close modal
        this.toggle();
    };

    handleCancel = () => {
        // reset state and clear errors
        this.setState({
            title: "",
            course: "",
            type: "",
            deadline: "",
            completion: 0,
            note: ""
        });

        // close modal
        this.toggle();
    };

    handleDelete = id => {
        const { deleteTask } = this.props; 

        deleteTask(id);

        // close modal onDelete
        this.toggle();
    };

    render() {
        const { modal, title, course, type, deadline, completion, description } = this.state;
        const {
            task: { 
                tasks,
                courses 
            }
        } = this.props;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Task</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody> 
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input 
                                    name="title" 
                                    type="text"
                                    placeholder="" 
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
                                />

                                <Label for="description">Description</Label>
                                <Input 
                                    name="description" 
                                    type="textarea" 
                                    placeholder="Enter Description.."
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete.bind(this._id)}>Delete</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Update</Button>
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