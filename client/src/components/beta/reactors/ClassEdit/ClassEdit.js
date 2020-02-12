import React, { Component } from "react";

import { connect } from "react-redux";
import  { updateClass, deleteClass } from "../../../../actions/beta/classes";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import {
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input
} from "reactstrap";

class ClassEdit extends Component {
    state = {
        modal: false
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        updateClass: PropTypes.func.isRequired,
        deleteClass: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    componentDidUpdate(prevProps) {
        const { error } = this.state;

        if(error !== prevProps.error) {
            if(error.id === "") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: "" });
            };
        } else {
            this.setState({ message: null });
        };
    };  

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;
        
        clearErrors();
        this.setState({ modal: !modal });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateClass } = this.props;
        const { } = this.state;

        const revisedClass = {

        };

        updateClass(revisedClass);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteClass } = this.props; 

        deleteClass(id);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    render() {
        const { modal } = this.state;
        const {
            classes: {
                classes,
                courses
            }
        } = this.props;

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Class
                    </ModalHeader>
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="course">Course</Label>
                                <Input
                                    name="course"
                                    type="select"
                                    value={}
                                    onChange={this.handleChange}
                                    required
                                >
                                    {courses.map(({ _id, title }) => {
                                        <option key={_id} value={JSON.stringify(title)}>
                                            {title}
                                        </option>
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for=""></Label>
                                <Input
                                    name=""
                                    type=""
                                    value={}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" onClick={this.handleDelete.bind(classes._id)} className="">
                                Delete Class
                            </Button>
                            <Button type="button" onClick={this.handleCancel} className="">
                                Cancel
                            </Button>
                            <Button type="submit" className="">
                                Update Class
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    classes: state.classes
});

const mapDispatchToProps = { updateClass, deleteClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(ClassEdit);