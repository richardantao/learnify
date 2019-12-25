import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { editCourse, updateCourse, deleteCourse } from "../../../../actions/beta/courses";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./CourseEditModal.scss";

class CourseEditModal extends Component {
    state = {
        modal: false
    };
    
    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editCourse: PropTypes.func.isRequired,
        updateCourse: PropTypes.func.isRequired,
        deleteCourse: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        const { editCourse } = this.props;

        editCourse();
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;

        if(error !== prevProps.error) {

        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state

        this.setState({
            modal: !modal
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateCourse } = this.props;
        const { } = this.state;
        
        const revisedCourse = {

        };

        updateCourse(revisedCourse);

        this.toggle();
    };

    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteCourse } = this.props;

        deleteCourse(id);

        this.toggle();
    };

    render() {
        const { modal } = this.state;

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Course</ModalHeader>
                    <Form onSubmit={this.handleSubmit} className="">
                        <ModalBody>  
                            <FormGroup className="form-data">
                                <Label for=""></Label>
                                <Input
                                    name=""
                                    type=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter className="form-actions">
                                <Button type="button" onClick={this.handleDelete.bind(this)}>Delete</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Save</Button>
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

const mapDispatchToProps = { editCourse, updateCourse, deleteCourse, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditModal);

