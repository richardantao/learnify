import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { editClass, updateClass, deleteClass } from "../../../../actions/beta/classes";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./ClassEditModal.scss";

class ClassEditModal extends Component {
    state = {
        modal: false
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editClass: PropTypes.func.isRequired,
        updateClass: PropTypes.func.isRequired,
        deleteClass: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        const { editClass } = this.props;

        editClass();
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

        const { updateClass } = this.props;
        const { } = this.state;

        const classes = {

        };

        updateClass(classes);

        this.toggle();
    };

    handleCancel = e => {
        this.setState({

        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteClass } = this.props;

        deleteClass(id);

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
                    <ModalHeader toggle={this.toggle}>Edit Class</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                                <FormGroup>
                                    <Label for=""></Label>
                                    <Input 
                                        name=""
                                        type="text"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <ModalFooter>
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
    error: state.error,
});

const mapDispatchToProps = { editClass, updateClass, deleteClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(ClassEditModal);

