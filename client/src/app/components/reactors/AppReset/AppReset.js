import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { resetPassword } from "../../../actions/auth/auth";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Container, Col, Row,
    Form, FormGroup, Label, Input
} from "reactstrap";

class AppReset extends Component {
    state = {
        change: "",
        confirm: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        resetPassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "PASSWORD_RESET_FAILED") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    handleSubmit = e => {
        e.preventDEfault();

        const { change, confirm } = this.state;
        const { resetPassword } = this.props; 

        resetPassword({ change, confirm });
    };

    render() {
        const { change, confirm, message }= this.state;

        const isEnabled = change === confirm;

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title> Learnify | Reset Password</title>
                </Helmet>
                <Container>
                    <Row>
                        <Col>
                            <Form>
                                { message ? <Alert color="danger">{message}</Alert> : null }
                                <FormGroup>
                                    <Label for="change">New Password</Label>
                                    <Input
                                        name="change"
                                        type="password"
                                        value={change}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirm">Confirm Password</Label>
                                    <Input
                                        name="confirm"
                                        type="password"
                                        value={confirm}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    { !isEnabled && confirm.length > 0 ? ( 
                                        <small className="warning">Passwords does not match</small> 
                                    ): null }
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" className="" disabled={!isEnabled}>
                                        Set New Password
                                    </Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { resetPassword, clearErrors};

export default connect(mapStateToProps, mapDispatchToProps)(AppReset);