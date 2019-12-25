import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createYear } from "../../../../actions/data/years";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./YearNewModal.scss";

class YearNewModal extends Component {
    state = {
        modal: false,
        title: "",
        start: "",
        end: ""
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        createYear: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
       
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
            [e.target.name]: [e.target.value]
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createYear } = this.props;
        const { title, start, end } = this.state;

        const year = {
            title,
            date: {
                start,
                end
            }
        };

        createYear(year);

        this.toggle();
    };

    handleCancel = () => {
        this.setState({
            title: "",
            start: "",
            end: ""
        });

        this.toggle();
    };

    render() {
        const { modal, title, start, end } = this.state;

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Academic Year
                </Button>
                
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Year</ModalHeader>
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
                                <Button type="submit">Add New Year</Button>
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

const mapDispatchToProps = { createYear, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(YearNewModal);