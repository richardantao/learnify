import React, { Component } from "react";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { createYear } from "../../../actions/data/years";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

/* */
import { 
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row, Col,
    Form, FormGroup, Alert, Label, Input, Button
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class YearNew extends Component {
    state = {
        isOpen: false,
        title: "",
        start: "",
        end: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        year: PropTypes.object.isRequired,
        createYear: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "YEARS_ERROR") {
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
        this.setState({ [e.target.name]: [e.target.value] });
    };

    handleCancel = () => {
        this.setState({
            isOpen: false,
            title: "",
            start: "",
            end: "",
            message: null
        });

        this.toggle();
    };

    handleSubmit = e => {
        e.preventDefault();

        const { title, start, end } = this.state;
        const { createYear } = this.props;

        const year = {
            title,
            date: {
                start,
                end
            }
        };

        createYear(year);
    };

    render() {
        const { isOpen, title, start, end, message } = this.state;

        const isEnabled = title && start && end && moment(start) < moment(end);

        return (
            <>
                <Button href="/beta/academics/new-year" type="button" onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Academic Year
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Create Year
                    </ModalHeader>
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
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" className="" onClick={this.handleCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" className="" disabled={!isEnabled}>
                                Create Year
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { createYear, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(YearNew);