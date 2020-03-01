import React, { Component } from "react";

import { connect } from "react-redux";
import { newTerm, createTerm } from "../../../../actions/app/terms";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class TermNew extends Component {
    state = {
        modal: false,
        year: "",
        title: "",
        start: "",
        end: "",
        years: [],
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        term: PropTypes.object.isRequired,
        newTerm: PropTypes.func.isRequired,
        createTerm: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        const { newTerm } = this.props;
        newTerm();

        const { years } = this.props.term;
        this.setState({ years });
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TERMS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();

        this.setState({ modal: !modal });
    };

    handleChange = e => { this.setState({ [e.target.name]: e.target.value }) };

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
        this.setState({
            year: "",
            title: "",
            start: "",
            end: "",
            years: [],
            message: null
        }); 
    };

    render() {
        const { modal, title, start, end, years, message } = this.state;
 
        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Term
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Term</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            { message === "Term created" ? <Alert color="success">{message}</Alert>
                            : message ? <Alert color="danger">{message}</Alert>
                            : null }
                            <FormGroup>
                                <Label for="year">Year</Label>
                                <Input
                                    name="year"
                                    type="select"
                                    onChange={this.handleChange}
                                    required
                                >
                                    {years.map(({ _id, title }) => {
                                        return (
                                            <option key={_id} value={JSON.stringify(_id)}>
                                                {title}
                                            </option>
                                        );
                                    })}    
                                </Input>

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
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit">Create Term</Button>
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
    term: state.term
});

const mapDispatchToProps = { newTerm, createTerm, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TermNew);