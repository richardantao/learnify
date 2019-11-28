import React, { Component } from "react";

import { connect } from "react-redux";
import { editCourse, updateCourse, deleteCourse } from "../../../actions/data/courses.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import {  
    Col, Row,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, 
    Button 
} from "reactstrap";

import "./CourseEditModal.scss";

class CourseEditModal extends Component {
    state = {
        open: false
    };
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editCourse: PropTypes.func.isRequired,
        updateCourse: PropTypes.func.isRequired,
        deleteCourse: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {

        this.props.editCourse();
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { } = this.state;
        
        const revisedCourse = {

        };

        this.props.updateCourse(revisedCourse);

        this.toggle();
    };

    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleDelete = id => {
        this.props.deleteCourse(id);

        this.toggle();
    };

    render() {
        const { open } = this.state;

        return (
            <Modal isOpen={open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit Course</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit} className="">
                        <FormGroup className="form-data">
                            <Label for=""></Label>
                            <Input
                            type=""
                            name=""
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className="form-actions">
                            <Button type="button" onClick={this.handleDelete.bind(this)}>Delete</Button>
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit">Save</Button>
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

const mapDispatchToProps = { editCourse, updateCourse, deleteCourse, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditModal);

