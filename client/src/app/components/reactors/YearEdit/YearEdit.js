import React, { Component } from "react";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { updateYear, deleteYear } from "../../../actions/data/years";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Row, Col,
    Form, FormGroup, Alert, Label, Input, Button
} from "reactstrap";

class YearEdit extends Component {
    state = {
        isOpen: false,
        _id: "",
        title: "",
        start: "",
        end: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        year: PropTypes.object.isRequired,
        updateYear: PropTypes.func.isRequired,
        deleteYear: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
        
    componentDidUpdate(prevProps) {
        const { 
            error,
            year: { years } 
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "YEARS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(years !== prevProps.year.years) {
            this.setState({
                _id: years._id,
                title: years._id,
                start: years.date.start,
                end: years.date.end
            });
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
            title: "",
            start: "",
            end: "",
            message: null
        });

        this.toggle();
    };

    handleDelete = id => {
        const { deleteYear } = this.props;

        deleteYear(id);

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { updateYear } = this.props;
        const { _id, title, start, end } = this.state;

        const year = {
            title,
            date: {
                start,
                end
            }
        };

        updateYear(_id, year);
    };

    render() {
        const { isOpen, _id, title, start, end, message } = this.state;

        const isEnabled = title && start && end && moment(start) < moment(end);

        return (
            <>
                <Button onClick={this.toggle}>
                    Manage Academics
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Year</ModalHeader>
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
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="start">Start Date</Label>
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
                                <Button type="button" onClick={this.handleDelete(_id)}>Delete Year</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit" disabled={!isEnabled}>Update Year</Button>
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
    year: state.year
});

const mapDispatchToProps = { updateYear, deleteYear, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(YearEdit);