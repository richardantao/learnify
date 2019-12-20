import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { editYear, updateYear, deleteYear } from "../../../actions/data/years.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Modal, ModalHeader, ModalBody, ModalFooter, 
    Form, FormGroup, Label, Input, Button 
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./YearEditModal.scss";

class YearEditModal extends Component {
    state = {
        modal: false,
        title: "",
        start: "",
        end: ""
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editYear: PropTypes.func.isRequired,
        updateYear: PropTypes.func.isRequired,
        deleteYear: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        const { editYear } = this.props;

        // get data for year instance
        editYear();
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

        const { updateYear } = this.props;
        const { title, start, end } = this.state;

        const year = {
            title,
            date: {
                start,
                end
            }
        };

        updateYear(year);

        this.toggle();
    };

    handleCancel = () => {
        // reset state
        this.setState({
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
        const { modal, title, start, end } = this.state;

        return (
            <Fragment>
                <Button onClick={this.toggle}>
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>

                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Year</ModalHeader>
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
                                <Button type="button" onClick={this.handleDelete.bind(this)}>Delete Year</Button>
                                <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                                <Button type="submit">Update Year</Button>
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

const mapDispatchToProps = { editYear, updateYear, deleteYear };

export default connect(mapStateToProps, mapDispatchToProps)(YearEditModal);



