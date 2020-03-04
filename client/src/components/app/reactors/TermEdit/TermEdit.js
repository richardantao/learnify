import React, { Component } from "react";

import moment from "moment";

import { connect } from "react-redux";
import { updateTerm, deleteTerm } from "../../../../actions/app/terms";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    Alert, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input
} from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class TermEdit extends Component {
    state = {
        modal: false,
        _id: "",
        year: {},
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
        updateTerm: PropTypes.func.isRequired,
        deleteTerm: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { 
            terms, 
            years
        } = this.props.term;

        this.setState({
            _id: terms._id,
            year: terms.year,
            title: terms.title,
            start: terms.date.start,
            end: terms.date.end,
            years
        });
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

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = () => {
        this.setState({
            _id: "",
            year: {},
            title: "",
            start: "",
            end: "",
            years: [],
            message: null
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteTerm } = this.props;

        deleteTerm(id);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    handleSubmit = e => {
        e.preventDefault();

        const { _id, year, title, start, end } = this.state;
        const { updateTerm } = this.props;

        const term = {
            year,
            title,
            date: {
                start,
                end
            }
        };

        updateTerm(_id, term);

        setTimeout(() => {
            this.toggle();
        }, 2000);
    };

    render() {
        const { modal, _id, year, title, start, end, years, message } = this.state;

        const isEnabled = year && title && start && end
        && moment(start) < moment(end);

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Term</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            { message === "Term updated" || message === "Term deleted" ? <Alert color="success">{message}</Alert>
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
                                    <option key={year._id} value={JSON.stringify(year._id)} selected="selected">
                                        {year.title}
                                    </option>
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
                                <Button type="button" onClick={this.handleDelete.bind(_id)}>Delete Term</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit" disabled={!isEnabled}>Update Term</Button>
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
    term: state.term
});

const mapDispatchToProps = { updateTerm, deleteTerm, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TermEdit);

