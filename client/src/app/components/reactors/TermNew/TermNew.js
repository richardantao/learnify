import React, { Component } from "react";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { newTerm, createTerm } from "../../../actions/data/terms";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

/* Atoms */
import Icon from "../../atoms/Icon";

import { 
    
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Row, Col,
    Form, FormGroup, Alert, Label, Input, Button
} from "reactstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class TermNew extends Component {
    state = {
        isOpen: false,
        year: "",
        title: "",
        start: "",
        end: "",
        years: [],
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        term: PropTypes.object.isRequired,
        newTerm: PropTypes.func.isRequired,
        createTerm: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps, prevState) {
        const { isOpen } = this.state;
        const { 
            error,
            term: { years },
            newTerm
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TERMS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(isOpen && !prevState.isOpen) {
            newTerm();
            
            if(years !== prevProps.term.years) {
                this.setState({ years });
            };
        };
    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { isOpen } = this.state;

        clearErrors();
        this.setState({ isOpen: !isOpen });
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
        const { isOpen, year, title, start, end, years, message } = this.state;

        const isEnabled = year && title && start && end
        && moment(start) < moment(end);
 
        return (
            <>
                <Button onClick={this.toggle}>
                    <Icon icon={faPlus}/> New Term
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Term</ModalHeader>
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
                                        <Label for="start">Start - </Label>
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
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit" disabled={!isEnabled}>Create Term</Button>
                        </ModalFooter> 
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

const mapDispatchToProps = { newTerm, createTerm, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(TermNew);