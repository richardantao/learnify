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
        modal: false
    };

    static propsTypes = {
        error: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        newClass: PropTypes.func.isRequired,
        createClass: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };      

    componentDidMount() {
        
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        
        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: "" })
            };
        } else { 
            this.setState({ message: null });
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

    handleSubmit = e => {
        e.preventDefault();

        const { createClass } = this.props;
        const { title, course } = this.state;

        const newClass = {

        };

        createClass(newClass);

        this.toggle();
    };

    render() {
        const { modal } = this.state;
        const { 
            classes: { courses }
        } = this.props;

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
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    // value={}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="course">Course</Label>
                                <Input
                                    name="course"
                                    type="select"
                                    // value={}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {/* {courses.map(({ _id, title }) => {
                                        <option key={_id} value={JSON.stringify(title)}>
                                            {title}
                                        </option>
                                    })} */}
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