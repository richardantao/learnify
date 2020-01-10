import React, { Component } from "react";

import { connect } from "react-redux";
import { editPassword, updatePassword } from "../../../../actions/beta/users";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

import "./Password.scss";

class Password extends Component {
    state = {
        current: "",
        new: "",
        confirm: ""
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editPassword: PropTypes.func.isRequired,
        updatePassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.editPassword();
    };

    componentDidUpdate(prevProps) {
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

    handleChange = e => {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        
        // if the new password is not empty and is equal to the confirmation password
        if(this.state.new !== "" && this.state.new === this.state.confirm) {
            this.props.updatePassword(this.state.new);
        };

    };

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Label for="current">Current Password</Label>
                        <Input 
                        name="current" 
                        type="password"
                        onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label for="new"></Label>
                        <Input 
                        name="new" 
                        type="password"
                        onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label for="confirm"></Label>
                        <Input 
                        name="confirm" 
                        type="password"
                        onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="reset" color="danger">Reset</Button>
                        <Button type="submit">Save</Button>
                    </Col>
                </Row>
            </Form>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editPassword, updatePassword, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Password);