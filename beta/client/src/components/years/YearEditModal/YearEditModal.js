import React, { Component } from "react";

import { connect } from "react-redux";
import { editYear, updateYear, deleteYear } from "../../../actions/data/years.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { 
    Col, Row, 
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input,
    Button 
} from "reactstrap";

import "./YearEditModal.scss";

class YearEditModal extends Component {
    state = {
        open: false,
        title: "",
        start: "",
        end: ""
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editYear: PropTypes.func.isRequired,
        updateYear: PropTypes.func.isRequired,
        deleteYear: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };
    
    componentDidMount() {
        // get data for year instance
        this.props.editYear();
    };

    componentDidUpdate() {
        const { error, isAuthenticated } = this.props;

        if(error) {
            if(!isAuthenticated) {
                this.setState({

                });
            } else {
                this.setState({

                });
            };
        } else {
            this.setState({

            });
        };
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });

        this.props.clearErrors();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { } = this.state;

        const revisedYear = {

        };

        this.props.updateYear(revisedYear);
    };

    handleCancel = () => {
        // reset state
        this.setState({

        });

        this.toggle();
    };

    handleDelete = id => {
        
        this.props.deleteYear(id);
    };

    render() {
        const { open } = this.state;

        return (
            <Modal isOpen={open} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit Year</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for=""></Label>
                            <Input
                            name=""
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button type="button" onClick={this.handleDelete.bind(this)}>Delete Year</Button>
                            <Button type="button" onClick={this.handleCancel}>Cancel</Button>
                            <Button type="submit">Update Year</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editYear, updateYear, deleteYear };

export default connect(mapStateToProps, mapDispatchToProps)(YearEditModal);



