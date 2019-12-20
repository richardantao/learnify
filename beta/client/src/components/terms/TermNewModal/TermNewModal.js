import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { newTerm, createTerm } from "../../../actions/data/terms.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./TermNewModal.scss";

class TermNewModal extends Component {
    state = {
        modal: false,
        title: "",
        start: "",
        end: ""
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        newTerm: PropTypes.func.isRequired,
        createTerm: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        const { newTerm } = this.props;

        newTerm();
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
            [e.target.name]: [e.target.value]
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createTerm } = this.props;
        const { title, start, end } = this.state;

        const term = {
            title,
            date: {
                start,
                end
            }
        };

        createTerm(term);

        this.toggle();
    };

    handleCancel = () => {
        // reset state
        this.setState({
            title: "",
            start: "",
            end: ""
        }); 

        // close modal
        this.toggle();
    };

    render() {
        const { modal, title, start, end } = this.state;

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Term
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Term</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for=""></Label>
                                <Input
                                    name=""
                                    type=""
                                    placeholder=""
                                    value=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Add New Term</Button>
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

const mapDispatchToProps = { newTerm, createTerm, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TermNewModal);