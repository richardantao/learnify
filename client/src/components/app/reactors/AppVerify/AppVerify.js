import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import { verifyEmail, resendEmailVerification } from "../../../../actions/auth/auth";
import { clearErrors } from "../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Alert, Button,
    Container, Row, Col,
    Form, FormGroup, Label, Input, Button } from "reactstrap";

class AppVerify extends Component {
    state = {
        email: "",
        message: null
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        verifyEmail: PropTypes.func.isRequired,
        resendEmailVerification: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { verifyEmail } = this.props;
        verifyEmail();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps) {
            if(error.id === "EMAIL_VERIFICATION_RESENT_FAILED") {
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
        e.preventDefault();

        const { email } = this.state;
        const { resendEmailVerification} = this.props;

        resendEmailVerification(email);
    };
    
    render() {
        const { email, message } = this.state;

        const isEnabled = regex.test(email);    

        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content=""/>
                    <title>Email Verification</title>
                </Helmet>
                <Container>
                    <Row>
                        <Col>
                            <Form>
                                { message ? <Alert color="danger">{message}</Alert> : null }
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    { email.length > 5 && !regex.test(email) ? (
                                        <small className="warning">
                                            Email must be a valid email address
                                        </small> 
                                    ) : null }
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" className="" disabled={!isEnabled}>
                                        Resend Email
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

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { verifyEmail, resendEmailVerification, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AppVerify);