import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchPreferences, updatePreferences } from "../../../actions/data/settings.action";
import { clearErrors } from "../../../actions/auth/errors.action";
import PropTypes from "prop-types";

import { Button, Col, Row } from "react-bootstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

import "./Preference.scss";

class Preference extends Component {
    state = {

    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        fetchPreferences: PropTypes.func.isRequired,
        updatePreferences: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchPreferences();
    };
    
    componentDidUpdate() {
        const { error, isAuthenticated } = this.props;

        if(error) {
            this.setState({
                
            });
            if (!isAuthenticated) {
                this.setState({
                    
                });
            };
        } else {
            this.setState({
                
            });
        };
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { } = this.state;

        const revisedPreferences = {

        };

        this.props.updatePreferences(revisedPreferences);
    };

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label></Label>
                    <Input
                    
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Save</Button> 
                </FormGroup>
            </Form>
        );
    };
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   error: state.error 
})  

const mapDispatchToProps = { fetchPreferences, updatePreferences, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Preference);
