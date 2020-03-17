import React, { Component } from "react";

import { connect } from "react-redux";
import { submitBug } from "../../../actions/data/bugs"; 
import { clearErrors } from "../../../actions/auth/errors"; 
import PropTypes from "prop-types";

import { 
    Alert, Button, 
    Form, FormGroup, Label, Input 
} from "reactstrap";
import Select from "react-select";

class BugSubmit extends Component {
    state = {
        where: "",
        type: "",
        description: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        submitBug: PropTypes.func.isRequired,
        clearErrors: PropTypes.object.isRequired
    };

    async componentDidMount() {
        const { clearErrors } = this.props;
        await clearErrors();
    };
    
    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "BUGS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = () => {
        this.setState({
            where: "",
            type: "",
            description: "",
            message: null
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { where, type, description } = this.state;
        const { submitBug } = this.props;

        const bug = {
            where,
            type,
            description
        };

        submitBug(bug);
    };

    render() {
        const { where, type, description, message } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                { message === "" ? <Alert>{message}</Alert>
                : message ? <Alert>{message}</Alert>
                : null }
                <FormGroup>
                    <Label for="where">Location of Bug</Label>
                    <Select 
                        options=""
                    />

                    <Label for="type">Bug Type</Label>
                    <Input
                        name="type"
                        type="text"
                        value={type}
                        onChange={this.handleChange}
                        required
                    />

                    <Label for="description">Description</Label>
                    <Input
                        name="description"
                        type="textarea"
                        value={description}
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="button" className="" onClick={this.handleCancel}>Submit Bug</Button>
                    <Button type="submit">Submit Bug</Button>
                </FormGroup>
            </Form>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { submitBug, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(BugSubmit);