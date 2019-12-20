import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { newClass, createClass } from "../../../actions/data/classes.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./ClassNewModal.scss";

class ClassNewModal extends Component {
    state = {
        modal: false
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        newClass: PropTypes.func.isRequired,
        createClass: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        const { newClass } = this.props; 


        newClass();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

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

        const { createClass } = this.props;
        const { } = this.state;

        const classes = {

        };

        createClass(classes);

        this.toggle();
    };

    handleCancel = () => {
        this.setState({

        });

        this.toggle();
    };

    render() {
        const { modal } = this.state;

        return(
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus} New Class/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Class</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for=""></Label>
                                <Input 
                                    type="text"
                                    name=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
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

const mapDispatchToProps = { newClass, createClass, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(ClassNewModal);