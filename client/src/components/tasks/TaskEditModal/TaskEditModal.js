import React, { Component } from "react";

import { connect } from "react-redux";
import { editTask, updateTask, deleteTask } from "../../../actions/data/tasks.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Col, Row, 
    Modal, ModalHeader, ModalBody, 
    Form, FormGroup, Label, Input, FormText, 
    Button 
} from "reactstrap";
import Select from "react-select";

import "./TaskEditModal.scss";

class TaskEditModal extends Component {
    state = {
        open: false,
        title: "",
        course: "",
        type: "",
        deadline: "",
        completion: 0,
        note: ""
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editTask: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.editTask();
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });

        this.props.clearErrors();
    };

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { title, course, type, deadline, completion, note } = this.state;

        const revisedTask = { title, course, type, deadline, completion, note };

        this.props.updateTask(revisedTask);

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

        this.props.deleteTask(id);

        // close modal onDelete
        this.props.toggle();
    };

    fetchCourses = () => {
        
    };

    render() {
        const { open } = this.state;

        const courses = courses.map(({ _id, course }) => (
            <option key={_id} value={course}>{course}</option>
        ));

        return (
            <Modal isOpen={open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit Task</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <h3>Edit Task</h3>
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input 
                            type="text"
                            name="title" 
                            placeholder="" 
                            value=""
                            onChange={this.handleChange}
                            />

                            <Label for="course">Course</Label>
                            <Select value="">
                                {courses}
                            </Select>

                            <Label for="type"></Label>
                            <Input 
                            type="text" 
                            name="type" 
                            placeholder="Enter task type"
                            onChange={this.handleChange}
                            />

                            <Label for="deadline"></Label>
                            <Input 
                            type="date" 
                            name="deadline" 
                            placeholder="Enter task deadline" 
                            onChange={this.handleChange}
                            />

                            <Label for="completion">Completion</Label>
                            <Input 
                            type="range" 
                            name="completion" 
                            value="" 
                            onChange={this.handleChange}
                            />

                            <Label for="note">Description</Label>
                            <Input 
                            type="textarea" 
                            name="note" 
                            placeholder="Enter description" 
                            value=""
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button type="button" onClick={this.handleDelete.bind(this)}>Delete</Button>
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit">Update</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editTask, updateTask, deleteTask, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditModal);