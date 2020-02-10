import React, { Component } from "react";

import { connect } from "react-redux";
import { newTerm, createTerm } from "../../../../actions/beta/terms";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./TermNewModal.scss";

class TermNewModal extends Component {
    state = {
        modal: false,
        year: "",
        title: "",
        start: "",
        end: "",
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        newTerm: PropTypes.func.isRequired,
        createTerm: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    // this won't work since the button renders with the Academics component; 
    // define a function that will fetch the parent options on rendering of the modal
    componentDidMount() {
        const { newTerm } = this.props;

        newTerm();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            this.setState({
               message: error.message.message 
            });
        } else {
            this.setState({
                message: null
            });
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();

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

        const { year, title, start, end } = this.state;
        const { createTerm } = this.props;

        const term = {
            year,
            title,
            date: {
                start,
                end
            }
        };

        createTerm(term);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    handleCancel = () => {
        // reset state
        this.setState({
            year: "",
            title: "",
            start: "",
            end: "",
            message: null
        }); 

        this.toggle();
    };

    render() {
        const { modal, year, title, start, end, message } = this.state;
        const { 
            term: { years }
        } = this.props;

        const yearOptions = years.map(year => {
            
        }); 

        return (
            <>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faPlus}/> New Term
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Term</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            {   message === "Term Created" ? (
                                <Alert color="success">{message}</Alert>
                            ): message ? (
                                <Alert color="danger">{message}</Alert>
                            ): null }
                            <FormGroup>
                                <Label for="year">Year</Label>
                                <Input
                                    name="year"
                                    type="select"
                                    onChange={this.handleChange}
                                    required
                                >
                                {yearOptions}    
                                </Input>

                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="start">Start Date</Label>
                                <Input
                                    name="start"
                                    type="date"
                                    value={start}
                                    onChange={this.handleChange}
                                    required
                                />

                                <Label for="end">End Date</Label>
                                <Input
                                    name="end"
                                    type="date"
                                    value={end}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Create Term</Button>
                            </ModalFooter> 
                        </ModalBody>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { newTerm, createTerm, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TermNewModal);