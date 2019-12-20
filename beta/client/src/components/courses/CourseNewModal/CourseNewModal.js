import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { newCourse, createCourse } from "../../../actions/data/courses.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./CourseNewModal.scss";

class CourseNewModal extends Component {
    state = {
        modal: false
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        newCourse: PropTypes.func.isRequired,
        createCourse: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { newCourse } = this.props;

        this.props.newCourse();
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

    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createCourse } = this.props;
        const { } = this.state;

        const course = {
            
        };

        // attempt to create new course
        createCourse(course);

        this.toggle();
    };
    
    render() {
        const { modal } = this.state;

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Course
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Course</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>    
                            <FormGroup>
                                <Label></Label>
                                <Input
                                    name=""
                                    type=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Add New Course</Button>
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
    error: state.error
});

const mapDispatchToProps = { newCourse, createCourse, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CourseNewModal);
