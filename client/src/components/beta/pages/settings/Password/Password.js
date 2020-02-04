import React, { Component } from "react";

import { connect } from "react-redux";
import { editPassword, updatePassword } from "../../../../../actions/beta/users";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";

import "./Password.scss";

class Password extends Component {
    state = {
        currentPass: "",
        newPass: "",
        confirmPass: ""
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        editPassword: PropTypes.func.isRequired,
        updatePassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.editPassword();
    };

    componentDidUpdate(prevProps) {
		// const { error, isAuthenticated } = this.props;

		// if(error !== prevProps.error) {
		// 	if(!isAuthenticated) {
		// 		this.setState({

		// 		});
		// 	} else {
		// 		this.setState({

		// 		});
		// 	};
		// } else {
		// 	this.setState({

		// 	});
		// };
	};

    handleChange = e => {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    };
    
    handleSubmit = e => {
        e.preventDefault();

        const { newPass, confirmPass } = this.state;
        const { updatePassword } = this.props;
        
        // if the new password is not empty and is equal to the confirmation password
        if(newPass !== "" && newPass === confirmPass) {
            updatePassword(newPass);
        };

    };

    render() {
        const { currentPass, newPass, confirmPass } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Label for="current">Current Password</Label>
                        <Input 
                            name="current" 
                            type="password"
                            onChange={this.handleChange}
                            value={currentPass}
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
                            value={newPass}
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
                            value={confirmPass}
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
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { editPassword, updatePassword, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Password);