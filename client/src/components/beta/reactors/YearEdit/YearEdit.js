import React, { Component } from "react";

import { connect } from "react-redux";
import { updateYear, deleteYear } from "../../../../actions/beta/years";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input
} from "reactstrap";

class YearEdit extends Component {
    state = {
        modal: false,
        _id: "",
        title: "",
        start: "",
        end: "",
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        year: PropTypes.object.isRequired,
        updateYear: PropTypes.func.isRequired,
        deleteYear: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            this.setState({ message: error.message.message });
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

        const { updateYear } = this.props;
        const { _id, title, start, end } = this.state;

        const year = {
            _id,
            title,
            date: {
                start,
                end
            }
        };

        updateYear(year);

        // close modal and sending confirmation message
        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    handleCancel = () => {
        // reset state
        this.setState({
            _id: "",
            title: "",
            start: "",
            end: ""
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteYear } = this.props;

        deleteYear(id);

        this.toggle();
    };

    render() {
        const { modal, _id, title, start, end, message } = this.state;

        return (
            <>
                <Button onClick={this.toggle}>
                    Manage Academics
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Year</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            {  message === "Year Updated" || message === "Year Deleted" ? (
                                <Alert color="success">{message}</Alert>
                            ): message ? (
                                <Alert color="danger">{message}</Alert>
                            ): null}
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
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
                                <Button type="button" onClick={this.handleDelete.bind(_id)}>Delete Year</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Update Year</Button>
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
    error: state.error,
    year: state.year
});

const mapDispatchToProps = { updateYear, deleteYear, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(YearEdit);