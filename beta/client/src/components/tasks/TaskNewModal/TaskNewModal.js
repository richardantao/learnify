import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { newTask, createTask } from "../../../actions/data/tasks.action";
import { clearErrors } from "../../../actions/auth/errors.action";
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
        note: ""
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

    handleCancel = e => {
        this.setState({
            title: "",
            course: "",
            type: "",
            deadline: "",
            completion: "",
            note: ""
        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { title, course, type, deadline, completion, note } = this.state;

        const { createTask } = this.props;
        const task = { title, course, type, deadline, completion, note };
      
        // Add item via createTask action
        createTask(task);
      
        // Close modal
        this.toggle();
    };
    
    render() {
        const { modal } = this.state;

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Task
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Task</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>    
                            <FormGroup className="modal-header">
                                <h3>New Task</h3>
                            </FormGroup>
                            <FormGroup className="modal-body">
                                <Label for=""></Label>
                                <Input 
                                    name=""
                                    type="" 
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter className="modal-action">
                                <Button type="button" onCancel={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Add New Task</Button>
                            </ModalFooter>
                        </ModalBody>
                    </Form>
                </Modal>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    tasks: state.tasks
});

const mapDispatchToProps = { newTask, createTask, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TaskNewModal);