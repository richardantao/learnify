import React, { Component } from "react";

import { connect } from "react-redux";
import { postBackend } from "../../../../../actions/team/applications";
import { clearErrors } from "../../../../../actions/auth/errors";
import PropTypes from "prop-types";

import { 
    Row, Col,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from "reactstrap";

import "../../Application.scss";

class Backend extends Component {
    state = {
        modal: false,
        first: "",
        last: "",
        email: "",
        city: "",
        strategy: "",
        help: "",
        importance: "",
        resume: "",
        portfolio: "",
        linkedin: "",
        other: ""
    };

    static propTypes = {
        application: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        postBackend: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {

    };

    toggle = () => {
        const { clearErrors } = this.props;
        const { modal } = this.state;

        clearErrors();

        this.setState({
            modal: !modal
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { postBackend } = this.props;
        const { 
            first, last, email, city, 
            strategy, help, importance, 
            resume, portfolio, linkedin, other
        } = this.state;

        const application = {
            first,
            last,
            email,
            city,
            strategy,
            help,
            importance,
            resume,
            portfolio, 
            linkedin,
            other
        };

        // send data to server
        postBackend(application);

        // close modal
        this.toggle();
    };

    render() {
        const { 
            modal,
            first, last, email, city, strategy, help, importance, resume, portfolio, linkedin, other
        } = this.state;

        const isEnabled = first.length > 0 && last.length > 0 && regex.test(email) && city.length > 0 
            && strategy.length > 74 && help.length > 100 && importance.length > 49
            && resume.length > 0 && portfolio.includes("github.com/") && linkedin.includes("linkedin.com/in/"); 
        
        const strategyMin = 75 - strategy.length;
        const strategyMax = 500 - strategy.length;

        const helpMin = 100 - help.length;
        const helpMax = 500 - help.length;
        
        const importanceMin = 50 - importance.length;
        const importanceMax = 400 - importance.length;

        return (
            <>
                <Button href="#backend" onClick={this.toggle}>Apply Now</Button>

                <Modal isOpen={modal} className="roles-app">
                    <ModalHeader toggle={this.toggle}>
                        <h4>Backend Node Developer &ndash; Application</h4>
                        
                    </ModalHeader>
                    <Form onSubmit={this.handleSubmit} className="application" enctype="multipart/form-data">
                        <ModalBody>
                            <FormGroup>
                                <h4>Personal</h4>
                                <Row>
                                    <Col>
                                        <Label for="first" className="required">First Name</Label>
                                        <Input
                                            name="first"
                                            type="text"
                                            placeholder="e.g. John"
                                            value={first}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="last" className="required">Last Name</Label>
                                        <Input
                                            name="last"
                                            type="text"
                                            placeholder="e.g. Doe"
                                            value={last}
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
                                            placeholder="e.g. johndoe@example.com"
                                            value={email}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { email.length > 0 && !regex.test(email) ? (
                                            <small className="warning">Email must be a valid email address</small>
                                        ): null }
                                    </Col>
                                    <Col>
                                        <Label for="city" className="required">City of Residence</Label>
                                        <Input
                                            name="city"
                                            type="text"
                                            placeholder="e.g. London"
                                            value={city}
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
                                        <Label className="required">
                                            You've been told that the SDLC of your team's backend is becoming messy and inefficient. Briefly discuss a strategy you would suggest to improve the
                                            the efficiency of the release cycle.
                                        </Label>
                                        <Input
                                            name="strategy"
                                            type="textarea"
                                            value={strategy}
                                            minLength={75}
                                            maxLength={500}
                                            rows={5}
                                            onChange={this.handleChange}
                                        />
                                        { strategy.length > 0 && strategy.length < 75 ? (
                                            <small className="warning">{strategyMin} characters required</small>
                                        ): strategy.length > 74 ? (
                                            <small>{strategyMax} characters left</small>
                                        ): null }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="required">
                                            Recall a recent event where you went out of your way to help someone else. 
                                            Include details about how you went about it, why you did it, and what difference your actions made.
                                        </Label>
                                        <Input
                                            name="help"
                                            type="textarea"
                                            value={help}
                                            minLength={100}
                                            maxLength={500}
                                            rows={5}
                                            onChange={this.handleChange}
                                        />
                                        { help.length > 0 && help.length < 100 ? (
                                            <small className="warning">{helpMin} characters required</small>
                                        ): help.length > 99 ? (
                                            <small>{helpMax} characters left</small>
                                        ): null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label className="required">
                                            What are three things that are most important to you in a work setting?
                                        </Label>
                                        <Input
                                            name="importance"
                                            type="textarea"
                                            value={importance}
                                            minLength={50}
                                            maxLength={400}
                                            rows={5}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { importance.length > 0 && importance.length < 50 ? (
                                            <small className="warning">{importanceMin} characters required</small>
                                        ): importance.length > 49 ? (
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
                                        <Label for="resume" className="required">Resume</Label>
                                        <Input
                                            name="resume"
                                            type="file"
                                            value={resume}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <Label for="portfolio" className="required">Github</Label>
                                        <Input
                                            name="portfolio"
                                            type="text"
                                            placeholder="https://github.com/username"
                                            value={portfolio}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { portfolio.length > 0 && !portfolio.includes("github.com/") ? (
                                            <small className="warning">URL must contain 'github.com/'</small>
                                        ): null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="linkedin" className="required">LinkedIn</Label>
                                        <Input
                                            name="linkedin"
                                            type="text"
                                            placeholder="https://linkedin.com/in/username"
                                            value={linkedin}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        { linkedin.length > 0 && !linkedin.includes("linkedin.com/in/") ? (
                                            <small className="warning">URL must contain 'linkedin.com/in/'</small>
                                        ): null}
                                    </Col>
                                    <Col>
                                        <Label for="other">Other</Label>
                                        <Input
                                            name="other"
                                            type="text"
                                            value={other}
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" block disabled={!isEnabled}>Submit Application</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    };
};

const regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const mapStateToProps = state => ({
    application: state.application,
    error: state.error
});

const mapDispatchToProps = { postBackend, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Backend);