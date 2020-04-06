import React, { Component } from "react";

import moment from "moment";

import { connect } from "react-redux";
import { updateTerm, deleteTerm } from "../../../actions/data/terms";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Row, Col,
    Form, FormGroup, Alert, Label, Input, Button 
} from "reactstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class TermEdit extends Component {
    state = {
        isOpen: false,
        _id: "",
        year: {},
        title: "",
        start: "",
        end: "",
        years: [],
        message: null
    };

    static propTypes = {
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
        const { isOpen } = this.state;

        clearErrors();
        this.setState({ isOpen: !isOpen });
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
    };

    render() {
        const { isOpen, _id, year, title, start, end, years, message } = this.state;

        const isEnabled = year && title && start && end
        && moment(start) < moment(end);

        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faEdit}/>
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Term</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            { message ? <Alert color="danger">{message}</Alert> : null }
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="title">Title</Label>
                                        <Input
                                            name="title"
                                            type="text"
                                            value={title}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
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
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="start">Start -</Label>
                                        <Input
                                            name="start"
                                            type="date"
                                            value={start}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="end">End Date</Label>
                                        <Input
                                            name="end"
                                            type="date"
                                            value={end}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <ModalFooter>
                                <Button type="button" onClick={this.handleDelete(_id)}>Delete Term</Button>
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
    error: state.error,
    term: state.term
});

const mapDispatchToProps = { updateTerm, deleteTerm, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TermEdit);

