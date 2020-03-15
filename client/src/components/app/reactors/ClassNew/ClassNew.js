import React, { Component } from "react";

import { connect } from "react-redux";
import { newClass, createClass } from "../../../../actions/app/classes";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Icons */
import Icon from "../../atoms/Icon";

import {
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


class ClassNew extends Component {
    state = {
        modal: false,
        courses: [],
        message: null
    };

    static propsTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        newClass: PropTypes.func.isRequired,
        createClass: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };      

    componentDidUpdate(prevProps, prevState) {
        const { modal } = this.state;
        const { 
            error,
            classes: { courses },
            newClass
        } = this.props;
        
        if(error !== prevProps.error) {
            if(error.id === "CLASSES_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(modal && !prevState.modal) {
            newClass();

            if(courses !== prevProps.classes.courses) {
                this.setState({ courses });
            };
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();
        this.setState({ modal: !modal});
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createClass } = this.props;
        const { title, course } = this.state;

        const newClass = {
            course,
            title
        };

        createClass(newClass);

        setTimeout(() => {
            this.toggle()
        }, 2000);
    };

    render() {
        const { modal, title, courses, message } = this.state;

        return (
            <>
                <Button>
                    <Icon icon={faPlus}/> New Class
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Create Class
                    </ModalHeader>
                    <Form>
                        <ModalBody>     
                            { message === "Class created" ? <Alert color="success">{message}</Alert>
                            : message ? <Alert color="danger">{message}</Alert>
                            : null }                   
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
                                    name="course"
                                    type="select"
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
                            <FormGroup>
                                    <Label for=""></Label>
                                    <Input
                                        name=""
                                        type=""
                                        // value={}
                                        onChange={this.handleChange}
                                        required
                                    />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" className="" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit" className="">Create Class</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    classes: state.classes
});

const mapDispatchToProps = { newClass, createClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(ClassNew);