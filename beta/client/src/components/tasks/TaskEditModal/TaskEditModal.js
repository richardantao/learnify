import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { editTask, updateTask, deleteTask } from "../../../actions/data/tasks.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import "./TaskEditModal.scss";

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
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
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
        const { modal } = this.state;

        const courses = courses.map(({ _id, course }) => (
            <option key={_id} value={course}>{course}</option>
        ));

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Task</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody> 
                            <FormGroup>
                                <h3>Edit Task</h3>
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input 
                                    name="title" 
                                    type="text"
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
                                    name="type" 
                                    type="text" 
                                    placeholder="Enter Type.."
                                    onChange={this.handleChange}
                                />

                                <Label for="deadline"></Label>
                                <Input 
                                    name="deadline" 
                                    type="date" 
                                    placeholder="Enter task deadline"
                                    value="" 
                                    onChange={this.handleChange}
                                />

                                <Label for="completion">Completion</Label>
                                <Input 
                                    name="completion" 
                                    type="range" 
                                    value="" 
                                    onChange={this.handleChange}
                                />

                                <Label for="note">Description</Label>
                                <Input 
                                    name="note" 
                                    type="textarea" 
                                    placeholder="Enter Description.."
                                    value=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete.bind(this)}>Delete</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Update</Button>
                            </ModalFooter>    
                        </ModalBody>
                    </Form>
                </Modal>
            </Fragment>
            
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editTask, updateTask, deleteTask, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditModal);