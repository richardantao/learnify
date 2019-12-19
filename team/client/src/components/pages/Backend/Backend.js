import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { postBackend } from "../../../actions/applications";
import { clearErrors } from "../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Row, Col, Container,
    Button, Form, FormGroup, Label, Input, InputGroup
} from "reactstrap";


import "./Backend.scss";

class Backend extends Component {
    state = {
        first: "",
        last: "",
        email: "",
        city: "",
        help: "",
        importance: "",
        github: "",
        linkedin: "",
        other: "",
        resume: null
    };

    static propTypes = {
        application: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postBackend: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { postBackend } = this.props;
        const { first, last, email } = this.state;

        const application = {
            name: {
                first,
                last
            },
            email
        };

        postBackend(application);
    };

    render() {
        const { first, last, email, city, help, importance, github, linkedin, resume } = this.state;

        const isEnabled = first.length > 0 && last.length > 0 && regex.test(email) && city.length > 0 
            && help.length > 49 && help.length < 401 && importance.length > 14 && importance.length < 201 
            && github.length > 0 && linkedin.length > 0 && resume.length > 0;
        
        const helpMin = 50 - help.length;
        const helpMax = 400 - help.length;
        
        const importanceMin = 30 - importance.length;
        const importanceMax = 200 - importance.length;

        return (
            <Fragment>
                <main>
                    <h2>Backend Node Developer &ndash; Application</h2>
                    <Container>
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSubmit} className="application">
                                    <FormGroup>
                                        <h4>Personal</h4>
                                        <Row>
                                            <Col>
                                                <Label for="first" className="required">First Name</Label>
                                                <Input
                                                    name="first"
                                                    type="text"
                                                    placeholder="First name.."
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Col>
                                            <Col>
                                                <Label for="last" className="required">Last Name</Label>
                                                <Input
                                                    name="last"
                                                    type="text"
                                                    placeholder="Last name.."
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="email" className="required">Email</Label>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email.."
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                { email.length > 0 && !regex.test(email) ? (
                                                    <small className="warning">Email must be a valid email address</small>
                                                ): null}
                                            </Col>
                                            <Col>
                                                <Label for="city" className="required">City of Residence</Label>
                                                <Input
                                                    name="city"
                                                    type="text"
                                                    placeholder="ex. London"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <h4>Tell us about yourself</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label>
                                                    Recall a recent event where you went out of your way to help someone else. 
                                                    Include details about how you went about it, why you did it, and what difference your actions made.
                                                </Label>
                                                <Input
                                                    name="help"
                                                    type="textarea"
                                                    maxLength={400}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                { help.length > 0 && help.length < 50 ? (
                                                    <small className="warning">{helpMin} characters required</small>
                                                ): help.length >= 50 && help.length < 400 ? (
                                                    <small>{helpMax} characters left</small>
                                                ): null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label>What are three things that are most important to you in a work setting?</Label>
                                                <Input
                                                    name="importance"
                                                    type="textarea"
                                                    maxLength={200}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                { importance.length > 0 && importance.length < 30 ? (
                                                    <small className="warning">{importanceMin} characters required</small>
                                                ): importance.length > 29 ? (
                                                    <small>{importanceMax} characters left</small>
                                                ): null }
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                                <h4>Links and attachments</h4>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="github" className="required">Github</Label>
                                                <Input
                                                    name="github"
                                                    type="url"
                                                    placeholder="https://github.com/username"
                                                    onChange={this.handleChange}
                                                />
                                            </Col>
                                            <Col>
                                                <Label for="" className="required">LinkedIn</Label>
                                                <Input
                                                    name="linkedin"
                                                    type="url"
                                                    placeholder="https://linkedin/in/username"
                                                    onChange={this.handleChange}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="other">Other</Label>
                                                <Input
                                                    name="other"
                                                    type="url"
                                                    onChange={this.handleChange}
                                                />
                                            </Col>
                                            <Col>
                                                <Label for="resume" className="required">Resume</Label>
                                                <Input
                                                    name="resume"
                                                    type="file"
                                                    multiple
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="submit" block disabled={!isEnabled}>Submit Application</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </main>
            </Fragment>
        );
    };
};

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const mapStateToProps = state => ({
    application: state.application,
    error: state.error
});

const mapDispatchToProps = { postBackend, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Backend);